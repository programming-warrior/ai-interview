import express, { Request, Response } from "express";
import cors from "cors";
import dotevn from "dotenv";
import axios from "axios";
import { Question } from "./models/Question";
import { AiInterview } from "./models/AiInterview";
import AppDataSource from "./db";
import multer from "multer";
import { readFromBucket, uploadToBucket } from "./bucket";

dotevn.config();
const app = express();

app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

(async () => {
    try {
        await AppDataSource.initialize();
        console.log('database connected');

        // ROUTES

        app.post('/api/v1/init', async (req, res) => {
            let { userId, jobId, interviewId } = req.body;
            userId = typeof (userId) === 'string' && userId.trim().length > 0 ? userId.trim() : null;
            jobId = typeof (jobId) === 'string' && jobId.trim().length > 0 ? jobId.trim() : null;
            interviewId = typeof (interviewId) === 'string' && interviewId.trim().length > 0 ? interviewId.trim() : null;

            if (!userId || !jobId || !interviewId) return res.status(400).json({ message: "invalid ids" });

            const interviewRepository = AppDataSource.getRepository(AiInterview);
            try {
                const interview = await interviewRepository.findOne({
                    where: { 
                        interviewId:interviewId,
                        jobId:jobId,
                        userId:userId
                     },
                })
                if (!interview) return res.status(404).json({ message: "interview not found" });
                if (interview.started) return res.status(400).json({ message: "interview already started" });

                const scheduledTime: Date = interview.scheduled_at;
                const currentTime: Date = new Date();
                if (currentTime < scheduledTime) return res.status(400).json({ message: "interview yet to be started" });

                interview.started = true;

                await interviewRepository.save(interview);
                return res.status(200).json({
                    totalQuestion: interview.totalQuestion
                });
            }
            catch (e) {
                return res.status(500).json({ message: "something went wrong" });
            }
        })

        app.post('/api/v1/nextquestion', async (req, res) => {
            let { userId, jobId, interviewId } = req.body;
            userId = typeof (userId) === 'string' && userId.trim().length > 0 ? userId.trim() : null;
            jobId = typeof (jobId) === 'string' && jobId.trim().length > 0 ? jobId.trim() : null;
            interviewId = typeof (interviewId) === 'string' && interviewId.trim().length > 0 ? interviewId.trim() : null;

            if (!userId || !jobId || !interviewId) return res.status(400).json({ message: "invalid ids" });

            try {
                await AppDataSource.transaction(async (transactionalEntityManager) => {
                    const interviewRepository = transactionalEntityManager.getRepository(AiInterview);
                    const interview = await transactionalEntityManager.createQueryBuilder(AiInterview, 'interview')
                        .where('interview.interviewId = :interviewId ', { interviewId })
                        .andWhere('interview.userId= :userId',{userId})
                        .andWhere('interview.jobId= :jobId',{jobId})
                        .setLock('pessimistic_write')
                        .getOne();

                    if (!interview) return res.status(404).json({ message: "interview not found" });

                    if (!interview.started) return res.status(400).json({ message: "interview not started" });

                    if (interview.currentQuestion > interview.totalQuestion) return res.status(400).json({ message: "question exhausted" });

                    const currentQuestion = interview.currentQuestion;
                    const questionRepository = AppDataSource.getRepository(Question);
                    const nextQuestion = await questionRepository.findOne({
                        where: {
                            interview: interview,
                            question_no: currentQuestion,
                        }
                    })

                    if (!nextQuestion) return res.status(404).json({ message: "next question not found" });

                    interview.currentQuestion += 1;
                    const audioRawData = await readFromBucket(process.env.BUCKET, nextQuestion.question_location);

                    if (!audioRawData) return res.status(404).json({ message: "audio not found! retry after sometimes" });

                    const audioFile = audioRawData.toString('base64');

                    await interviewRepository.save(interview);

                    return res.status(201).json({
                        audioFile: audioFile,
                        text: nextQuestion.question_text,
                        questionId: nextQuestion.questionId,
                        nextQuestion: interview.currentQuestion > interview.totalQuestion ? -1 : interview.currentQuestion,
                    });

                })
            }
            catch (e) {
                console.log(e);
                return res.status(500).end();
            }

        })

        app.post('/api/v1/answer-text', async (req, res) => {
            let { data, interviewId, questionId } = req.body;
            let { text } = data;
            const answer_text = typeof (text) === 'string' ? text : null;
            interviewId = typeof (interviewId) == 'string' ? interviewId : null;
            questionId = typeof (questionId) == 'string' && !isNaN(parseInt(questionId)) ? questionId : null;
            if (!answer_text || !interviewId || !questionId) {
                return res.status(400).json({ message: "invalid input sent" });
            }
        
            const questionRepository = AppDataSource.getRepository(Question);
            try {
                const question = await questionRepository.findOne({
                    where: {
                        questionId: questionId,
                    }
                });
                if (!question) return res.status(404).json({ message: "question not found" })

                question.isAnswerTextAvailable = true;
                question.answer_text = answer_text;

                const question_text = question.question_text;
                const mlResponse = await axios.post("https://hr-round-api-qumcb7zgza-uc.a.run.app/predict_hr/", { question: question_text, answer: answer_text });
                question.score=mlResponse.data;

                await questionRepository.save(question);
                return res.status(200).end();
            }
            catch(e:any){
                console.log(e);
                return res.status(500).json({message:e.message});
            }
      
        })

        app.post('/api/v1/answer', upload.single('file'), async (req, res) => {
            const answer = req.file;
            if (!answer) return res.status(404).json({ message: "answer missing" });
            let { userId, jobId, interviewId, questionId } = req.body;
            userId = typeof (userId) === 'string' && userId.trim().length > 0 ? userId.trim() : null;
            jobId = typeof (jobId) === 'string' && jobId.trim().length > 0 ? jobId.trim() : null;
            interviewId = typeof (interviewId) === 'string' && interviewId.trim().length > 0 ? interviewId.trim() : null;
            questionId = typeof (questionId) === 'string' && (!isNaN(parseInt(questionId))) ? parseInt(questionId) : null;

            if (!userId || !jobId || !interviewId || !questionId) return res.status(400).json({ message: "invalid ids" });

            try {
                const interviewRepository = AppDataSource.getRepository(AiInterview);
                const interview = await interviewRepository.findOne({
                    where: {
                        interviewId: interviewId,
                        jobId:jobId,
                        userId:userId
                    }
                })
                if (!interview) return res.status(404).json({ message: "interview not found" });
                if (!interview.started) return res.status(400).json({ message: "interview not started" })

                const questionRepository = AppDataSource.getRepository(Question);
                const question = await questionRepository.findOne({
                    where: {
                        questionId
                    }
                });
                if (!question) return res.status(404).json({ message: "question not found" });
                if (question.answer_location || question.answer_text) return res.status(400).json({ message: "question already answered" });
                if(question.question_no>=interview.currentQuestion) return res.status(400).json({message:"answer cannot be submitted"}); 


                const result = await uploadToBucket(answer, interviewId, questionId) as string;

                question.answer_location = result;

                await questionRepository.save(question);

                return res.status(201).json({ message: "answer submitted" });
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({ message: "something went wrong" });
            }
        })


        const port = process.env.PORT || 8080;
        app.listen(port, () => {
            console.log(`app is listening on port ${port}`)
        })

    } catch (message) {
        console.log("Error during Data Source initialization:", message);
        process.exit(1);
    }
})();

