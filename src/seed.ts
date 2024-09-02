import AppDataSource  from './db'; 
import { AiInterview } from './models/AiInterview';
import { Question } from './models/Question';

console.log("new line");

(async () => {
    try {
        await AppDataSource.initialize();

        const aiInterviewRepository = AppDataSource.getRepository(AiInterview);
        const questionRepository = AppDataSource.getRepository(Question);



        if(questionRepository){
            await questionRepository.delete({});  
        }
        if(aiInterviewRepository){
            await aiInterviewRepository.delete({});
        }

        const aiInterview1 = aiInterviewRepository.create({
            interviewId: 'interview1',
            jobId: 'job1',
            userId: 'user1',
            totalQuestion: 10,
            scheduled_at: new Date(),
            currentQuestion: 1,
            violations: { policy: 'none' },
        });

        const aiInterview2 = aiInterviewRepository.create({
            interviewId: 'interview2',
            jobId: 'job2',
            userId: 'user2',
            totalQuestion: 10,
            scheduled_at: new Date(),
            currentQuestion: 1,
            violations: { policy: 'none' },
        });
        
        const aiInterview3 = aiInterviewRepository.create({
            interviewId: 'interview3',
            jobId: 'job3',
            userId: 'user3',
            totalQuestion: 10,
            scheduled_at: new Date(),
            currentQuestion: 1,
            violations: { policy: 'none' },
        });

        await aiInterviewRepository.save([aiInterview1, aiInterview2,aiInterview3]);

        const questions = questionRepository.create([
            {
                question_location: 'q1.mp3',
                question_text: "Good morning, Jane. It's a pleasure to have you here today. I've reviewed your resume and I must say, your experience in both tech and mentorship roles is quite impressive. Can you tell me what drives your passion for combining technology with social impact, as seen in projects like eFile and your work with e-K Mentor?",
                question_no: 1,
                answer_location: null,
                answer_text: null,
                isAnswerTextAvailable: false,
                interview: aiInterview1, 
            },
            {
                question_location: 'q2.mp3',
                question_text: "Considering your experience in developing a brand new website for TechDosPVT Ltd and creating projects like Sketchbook Stories, how do you stay updated with the latest trends and advancements in UI-UX design and web development?",
                question_no: 2,
                answer_location: null,
                answer_text: null,
                isAnswerTextAvailable: false,
                interview: aiInterview1, 
            },
            {
                question_location: 'q3.mp3',
                question_text: 'Transitioning from individual projects to collaborative environments, such as your work at Tectos PV, TDA, and Ambition Foundation, how do you handle conflicting opinions or ideas within a team, particularly when working on projects with site deadlines?',
                question_no: 3,
                answer_location: null,
                answer_text: null,
                isAnswerTextAvailable: false,
                interview: aiInterview1, 
            },
            {
                question_location: 'q4.mp3',
                question_text: 'Transitioning from individual projects to collaborative environments, such as your work at Tectos PV, TDA, and Ambition Foundation, how do you handle conflicting opinions or ideas within a team, particularly when working on projects with site deadlines?',
                question_no: 4,
                answer_location: null,
                answer_text: null,
                isAnswerTextAvailable: false,
                interview: aiInterview1, 
            },
            {
                question_location: 'q5.mp3',
                question_text: "Considering your experience in developing a brand new website for TechDosPVT Ltd and creating projects like Sketchbook Stories, how do you stay updated with the latest trends and advancements in UI-UX design and web development?",
                question_no: 5,
                answer_location: null,
                answer_text: null,
                isAnswerTextAvailable: false,
                interview: aiInterview1, 
            },
            {
                question_location: 'q6.mp3',
                question_text: "Considering your experience in developing a brand new website for TechDosPVT Ltd and creating projects like Sketchbook Stories, how do you stay updated with the latest trends and advancements in UI-UX design and web development?",
                question_no: 6,
                answer_location: null,
                answer_text: null,
                isAnswerTextAvailable: false,
                interview: aiInterview1, 
            },
            {
                question_location: 'q7.mp3',
                question_text: "Considering your experience in developing a brand new website for TechDosPVT Ltd and creating projects like Sketchbook Stories, how do you stay updated with the latest trends and advancements in UI-UX design and web development?",
                question_no: 7,
                answer_location: null,
                answer_text: null,
                isAnswerTextAvailable: false,
                interview: aiInterview1, 
            },
            {
                question_location: 'q8.mp3',
                question_text: "Considering your experience in developing a brand new website for TechDosPVT Ltd and creating projects like Sketchbook Stories, how do you stay updated with the latest trends and advancements in UI-UX design and web development?",
                question_no: 8,
                answer_location: null,
                answer_text: null,
                isAnswerTextAvailable: false,
                interview: aiInterview1, 
            },
            {
                question_location: 'q9.mp3',
                question_text: "Considering your experience in developing a brand new website for TechDosPVT Ltd and creating projects like Sketchbook Stories, how do you stay updated with the latest trends and advancements in UI-UX design and web development?",
                question_no: 9,
                answer_location: null,
                answer_text: null,
                isAnswerTextAvailable: false,
                interview: aiInterview1, 
            },
            {
                question_location: 'q10.mp3',
                question_text: "Considering your experience in developing a brand new website for TechDosPVT Ltd and creating projects like Sketchbook Stories, how do you stay updated with the latest trends and advancements in UI-UX design and web development?",
                question_no: 10,
                answer_location: null,
                answer_text: null,
                isAnswerTextAvailable: false,
                interview: aiInterview1, 
            },


            {
                question_location: 'q1.mp3',
                question_text: "Good morning, Jane. It's a pleasure to have you here today. I've reviewed your resume and I must say, your experience in both tech and mentorship roles is quite impressive. Can you tell me what drives your passion for combining technology with social impact, as seen in projects like eFile and your work with e-K Mentor?",
                question_no: 1,
                answer_location: null,
                answer_text: null,
                isAnswerTextAvailable: false,
                interview: aiInterview2, 
            },
            {
                question_location: 'q2.mp3',
                question_text: "Considering your experience in developing a brand new website for TechDosPVT Ltd and creating projects like Sketchbook Stories, how do you stay updated with the latest trends and advancements in UI-UX design and web development?",
                question_no: 2,
                answer_location: null,
                answer_text: null,
                isAnswerTextAvailable: false,
                interview: aiInterview2, 
            },
            {
                question_location: 'q3.mp3',
                question_text: 'Transitioning from individual projects to collaborative environments, such as your work at Tectos PV, TDA, and Ambition Foundation, how do you handle conflicting opinions or ideas within a team, particularly when working on projects with site deadlines?',
                question_no: 3,
                answer_location: null,
                answer_text: null,
                isAnswerTextAvailable: false,
                interview: aiInterview2, 
            },
            {
                question_location: 'q4.mp3',
                question_text: 'Transitioning from individual projects to collaborative environments, such as your work at Tectos PV, TDA, and Ambition Foundation, how do you handle conflicting opinions or ideas within a team, particularly when working on projects with site deadlines?',
                question_no: 4,
                answer_location: null,
                answer_text: null,
                isAnswerTextAvailable: false,
                interview: aiInterview2, 
            },
            {
                question_location: 'q5.mp3',
                question_text: "Considering your experience in developing a brand new website for TechDosPVT Ltd and creating projects like Sketchbook Stories, how do you stay updated with the latest trends and advancements in UI-UX design and web development?",
                question_no: 5,
                answer_location: null,
                answer_text: null,
                isAnswerTextAvailable: false,
                interview: aiInterview2, 
            },
            {
                question_location: 'q6.mp3',
                question_text: "Considering your experience in developing a brand new website for TechDosPVT Ltd and creating projects like Sketchbook Stories, how do you stay updated with the latest trends and advancements in UI-UX design and web development?",
                question_no: 6,
                answer_location: null,
                answer_text: null,
                isAnswerTextAvailable: false,
                interview: aiInterview2, 
            },
            {
                question_location: 'q7.mp3',
                question_text: "Considering your experience in developing a brand new website for TechDosPVT Ltd and creating projects like Sketchbook Stories, how do you stay updated with the latest trends and advancements in UI-UX design and web development?",
                question_no: 7,
                answer_location: null,
                answer_text: null,
                isAnswerTextAvailable: false,
                interview: aiInterview2, 
            },
            {
                question_location: 'q8.mp3',
                question_text: "Considering your experience in developing a brand new website for TechDosPVT Ltd and creating projects like Sketchbook Stories, how do you stay updated with the latest trends and advancements in UI-UX design and web development?",
                question_no: 8,
                answer_location: null,
                answer_text: null,
                isAnswerTextAvailable: false,
                interview: aiInterview2, 
            },
            {
                question_location: 'q9.mp3',
                question_text: "Considering your experience in developing a brand new website for TechDosPVT Ltd and creating projects like Sketchbook Stories, how do you stay updated with the latest trends and advancements in UI-UX design and web development?",
                question_no: 9,
                answer_location: null,
                answer_text: null,
                isAnswerTextAvailable: false,
                interview: aiInterview2, 
            },
            {
                question_location: 'q10.mp3',
                question_text: "Considering your experience in developing a brand new website for TechDosPVT Ltd and creating projects like Sketchbook Stories, how do you stay updated with the latest trends and advancements in UI-UX design and web development?",
                question_no: 10,
                answer_location: null,
                answer_text: null,
                isAnswerTextAvailable: false,
                interview: aiInterview2, 
            },


            {
                question_location: 'q1.mp3',
                question_text: "Good morning, Jane. It's a pleasure to have you here today. I've reviewed your resume and I must say, your experience in both tech and mentorship roles is quite impressive. Can you tell me what drives your passion for combining technology with social impact, as seen in projects like eFile and your work with e-K Mentor?",
                question_no: 1,
                answer_location: null,
                answer_text: null,
                isAnswerTextAvailable: false,
                interview: aiInterview3, 
            },
            {
                question_location: 'q2.mp3',
                question_text: "Considering your experience in developing a brand new website for TechDosPVT Ltd and creating projects like Sketchbook Stories, how do you stay updated with the latest trends and advancements in UI-UX design and web development?",
                question_no: 2,
                answer_location: null,
                answer_text: null,
                isAnswerTextAvailable: false,
                interview: aiInterview3, 
            },
            {
                question_location: 'q3.mp3',
                question_text: 'Transitioning from individual projects to collaborative environments, such as your work at Tectos PV, TDA, and Ambition Foundation, how do you handle conflicting opinions or ideas within a team, particularly when working on projects with site deadlines?',
                question_no: 3,
                answer_location: null,
                answer_text: null,
                isAnswerTextAvailable: false,
                interview: aiInterview3, 
            },
            {
                question_location: 'q4.mp3',
                question_text: 'Transitioning from individual projects to collaborative environments, such as your work at Tectos PV, TDA, and Ambition Foundation, how do you handle conflicting opinions or ideas within a team, particularly when working on projects with site deadlines?',
                question_no: 4,
                answer_location: null,
                answer_text: null,
                isAnswerTextAvailable: false,
                interview: aiInterview3, 
            },
            {
                question_location: 'q5.mp3',
                question_text: "Considering your experience in developing a brand new website for TechDosPVT Ltd and creating projects like Sketchbook Stories, how do you stay updated with the latest trends and advancements in UI-UX design and web development?",
                question_no: 5,
                answer_location: null,
                answer_text: null,
                isAnswerTextAvailable: false,
                interview: aiInterview3, 
            },
            {
                question_location: 'q6.mp3',
                question_text: "Considering your experience in developing a brand new website for TechDosPVT Ltd and creating projects like Sketchbook Stories, how do you stay updated with the latest trends and advancements in UI-UX design and web development?",
                question_no: 6,
                answer_location: null,
                answer_text: null,
                isAnswerTextAvailable: false,
                interview: aiInterview3, 
            },
            {
                question_location: 'q7.mp3',
                question_text: "Considering your experience in developing a brand new website for TechDosPVT Ltd and creating projects like Sketchbook Stories, how do you stay updated with the latest trends and advancements in UI-UX design and web development?",
                question_no: 7,
                answer_location: null,
                answer_text: null,
                isAnswerTextAvailable: false,
                interview: aiInterview3, 
            },
            {
                question_location: 'q8.mp3',
                question_text: "Considering your experience in developing a brand new website for TechDosPVT Ltd and creating projects like Sketchbook Stories, how do you stay updated with the latest trends and advancements in UI-UX design and web development?",
                question_no: 8,
                answer_location: null,
                answer_text: null,
                isAnswerTextAvailable: false,
                interview: aiInterview3, 
            },
            {
                question_location: 'q9.mp3',
                question_text: "Considering your experience in developing a brand new website for TechDosPVT Ltd and creating projects like Sketchbook Stories, how do you stay updated with the latest trends and advancements in UI-UX design and web development?",
                question_no: 9,
                answer_location: null,
                answer_text: null,
                isAnswerTextAvailable: false,
                interview: aiInterview3, 
            },
            {
                question_location: 'q10.mp3',
                question_text: "Considering your experience in developing a brand new website for TechDosPVT Ltd and creating projects like Sketchbook Stories, how do you stay updated with the latest trends and advancements in UI-UX design and web development?",
                question_no: 10,
                answer_location: null,
                answer_text: null,
                isAnswerTextAvailable: false,
                interview: aiInterview3, 
            }
        ]);

        await questionRepository.save(questions);

        console.log("Seeding completed!");

        await AppDataSource.destroy();
    } catch (error) {
        console.error("Error during seeding:", error);
        process.exit(1);
    }
})();
