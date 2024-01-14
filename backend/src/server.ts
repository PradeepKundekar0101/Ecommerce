import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { errorMiddleware } from './middleware/error';
const app = express();
const PORT = process.env.PORT || 8000;

//Use the Middlewares
app.use(cors({
    origin:"*"
}));
app.use(express.json())
app.listen(PORT,()=>{
    console.log("Server running at port "+PORT);
})

app.all("*",(req:Request,res:Response,next:NextFunction)=>{
    const err = new Error(`Route ${req.originalUrl} not found on the server`) as any;
    err.statusCode = 404;
    next(err);
})
app.use(errorMiddleware)
