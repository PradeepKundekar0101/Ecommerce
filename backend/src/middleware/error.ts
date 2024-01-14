import  { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
export const errorMiddleware =(err:any,req:Request,res:Response,next:NextFunction)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server error";
    //Duplicate Key Error
    if(err.code=== 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message,400);
    }
    //Wrong JWT Error
    if(err.name=== "JsonWebTokenError"){
        const message = `Json Web token is invalid, try again`;
        err = new ErrorHandler(message,400);
    }

    // JWT Token Expired
    if(err.name=== "TokenExpiredError"){
        const message = `Json Web token is expired, try again`;
        err = new ErrorHandler(message,400);
    }
    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}