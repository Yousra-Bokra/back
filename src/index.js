import express from 'express';
import connectMongoDB from './db/dbconnect.js';
import Yousra from './model/UserModel.js';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import route from './routes/UserRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

connectMongoDB();
 
console.log(process.env.MONGOURI)

app.use(cors({
    // origin : 'http://localhost:5175',
    // credentials: true     
    
    //  origin: true,

    origin: "https://front-ecru-nine.vercel.app", 
    methods: ["POST", "GET", "PUT", "DELETE"],

    credentials: true

}))

app.options('*', cors());

app.use(express.json());
app.use(cookieParser());
console.log(cookieParser);


app.get('/',(req, res)=> {
    res.json({
        status: true,
        message: "seccesfully run",
        name : "Yousra",
      
    })
})



app.use('/api/v1/', route);




app.listen(PORT, () => {
  console.log("server is running successfully on: http://localhost:" , PORT);
});