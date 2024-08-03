import express from 'express';
import {} from 'dotenv/config';
import registerrouter from './Routers/Register.js';
import { connectDb } from './config/db.js';
import fav from './Routers/Favfunc.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api",registerrouter);
app.use('/api',fav);

app.get('/',(req,res)=>{
    res.send("This is home Router")
})
const PORT=process.env.port || 3200;
app.listen(PORT, async()=>{
    try{
        await connectDb();
        console.log(`server is runing on port ${PORT}`);
    }catch(err){
        console.log(err);
    }
})