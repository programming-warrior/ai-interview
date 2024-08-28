import { Storage } from "@google-cloud/storage";
import dotenv from "dotenv";
dotenv.config();


const storage = new Storage({
    projectId: process.env.PROJECTID,
    keyFilename: process.env.KEYFILENAME,
})

export async function readFromBucket(bucket: string | undefined, fileName: string) {
    if (!bucket) return null;
    const [file] = await storage.bucket(bucket).file('q1.mp3').download();
    return file;
}

export function uploadToBucket(fileData:any,questionId:number):Promise<string|Error>{
    const bucketName = 'interview-answer';  

    const filename = `a${questionId}.${fileData.originalname.split('.')[1]}`; 

    const bucket = storage.bucket(bucketName);

    const file = bucket.file(filename);

    const stream = file.createWriteStream({ resumable: false });

    return new Promise((resolve, reject) => {
        stream.on('error', (err) => {
          console.error('Error uploading file:', err);
          reject(err);
        });
    
        stream.on('finish', () => {
          resolve(filename );
        });
    
        stream.end(fileData.buffer);
      });
}