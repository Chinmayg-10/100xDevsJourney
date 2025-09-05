import { NextFunction , Request, Response} from "express";
import jwt from "jsonwebtoken";
const JWT_USER = "fnejnfjnefj";
export const Middleware=(req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers["authorization"]?.split(" ")[1]; // Bearer <token>
    const decodedInfo=jwt.verify(token as string,JWT_USER);
    if(decodedInfo){
        //@ts-ignore
        req.userId=decodedInfo.id;
        next();
    }
    else{
        res.status(403).json({
            message:"You are not logged in"
        })
    }
}