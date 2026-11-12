import express from 'express'
import mongoose from 'mongoose'
import dns from "node:dns"
import cors from 'cors'
import userRouter from './routes/userRouter.js';
import { verify } from 'node:crypto';
import authenticateUser from './middlewares/authenticate.js';
import productRouter from './routes/productRouter.js';
import dotenv from 'dotenv'
dotenv.config()

dns.setServers(["1.1.1.1", "8.8.8.8"]);
const mongoUri = process.env.MONGO_URI

mongoose.connect(mongoUri).then(
    () => {
         console.log("✅ Successfully connected to MongoDB.")
    }
)

.catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
});
const app = express()



app.use(cors())
app.use(express.json())

app.use(authenticateUser)

app.use("/users", userRouter)
app.use("/products", productRouter)



app.listen(3000, 
    ()=>{
        console.log("Sever is runing")
    }
)
app.delete("/" ,
    ()=>{
        console.log("Delete request resived")
    }
)