import {DataSource} from "typeorm";
import { AiInterview } from "./models/AiInterview";
import { Question } from "./models/Question";
import dotenv from "dotenv";
dotenv.config();

console.log( process.env.INSTANCE_UNIX_SOCKET );

const AppDataSource=new DataSource({
    type:'postgres',
    port:5432,
    username:process.env.DB_USERNAME || "yusuf",
    password: process.env.DB_PASSWORD || "yusuf",
    host:process.env.INSTANCE_UNIX_SOCKET,
    database:'acencore',
    entities:[Question,AiInterview],
    logging:false,
    synchronize:false,
    extra: {
        socketPath: process.env.INSTANCE_UNIX_SOCKET || "", 
    },
})

export default AppDataSource;