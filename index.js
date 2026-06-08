import express from 'express'
import mongoose from 'mongoose'
import dns from "node:dns"
import studentRouter from './routes/studentRouter.js';
import userRouter from './routes/userRouter.js';

import { verify } from 'node:crypto';
import authenticateUser from './middlewares/authenticate.js';
import productRouter from './routes/productRouter.js';


dns.setServers(["1.1.1.1", "8.8.8.8"]);
const mongoUri = "mongodb+srv://adimn:123@cluster0.grmquas.mongodb.net/?appName=Cluster0"

mongoose.connect(mongoUri).then(
    () => {
         console.log("✅ Successfully connected to MongoDB.")
    }
)

.catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
});
const app = express()



app.use(express.json())

app.use(authenticateUser)
app.use("/students", studentRouter)
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