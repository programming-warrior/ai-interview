import {DataSource} from "typeorm";
import { AiInterview } from "./models/AiInterview";
import { Question } from "./models/Question";


const AppDataSource=new DataSource({
    type:'postgres',
    host:'localhost',
    port:5432,
    username:process.env.DB_USERNAME || "yusuf",
    password: process.env.DB_PASSWORD || "yusuf",
    database:'acencore',
    entities:[Question,AiInterview],
    logging:false,
    synchronize:true
})

export default AppDataSource;