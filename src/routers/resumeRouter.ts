import express from "express";
import multer from "multer";
import FormData from "form-data";
import axios from "axios";

const resumeRouter=express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

resumeRouter.post('/',upload.single('file'),async(req,res)=>{
    try{
        const fileBuffer=req.file?.buffer;
        const fileName=req.file?.originalname;
        const formData=new FormData();
        formData.append('file',fileBuffer,fileName);

        const apiResponse=await axios.post('https://resume-parser-qumcb7zgza-uc.a.run.app/run_pipeline/',formData,{
            headers:{
                ...formData.getHeaders()
            }
        }) 
        res.status(apiResponse.status).json(apiResponse.data);
    }
    catch(e){
        res.status(500).json({error:"something went wrong while parsing your resume"});
    }
})

export default resumeRouter;




