import express from "express";
import multer from "multer";
import FormData from "form-data";
import axios from "axios";

const sttRouter=express.Router();

const upload=multer({storage:multer.memoryStorage()})

sttRouter.post('/',upload.single('file'),async (req,res)=>{
    try{
        const audioBuffer= req.file?.buffer;
        const audioName=req.file?.originalname;
        const formData=new FormData();
        formData.append('file',audioBuffer,audioName);
        const apiResponse=await axios.post('https://ai-interview-speech-qumcb7zgza-uc.a.run.app/speech_to_text',formData,{
            headers:{
                ...formData.getHeaders()
            }
        });
        
        return res.status(apiResponse.status).json(apiResponse.data);
    }
    catch(e){
        return res.status(500).json({error:"something went wrong"});
    }
})

export default sttRouter;