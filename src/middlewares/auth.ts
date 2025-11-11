import { Request , Response , NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export interface AuthRequest extends Request {
    user?: {id: number; email: string;};
}

export default function auth(req: AuthRequest, res: Response, next: NextFunction){
    const header = req.headers.authorization;
    if(!header){
        return res.status(401).json({message: "Authorization header missing"});
    }
    const parts = header.split(" ");
    if(parts.length !== 2 || parts[0] !== "Bearer"){
        return res.status(401).json({message: "Invalid authorization format"});
    }
    const token = parts[1];
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as {id: number; email: string;};
        req.user = payload;
        next();
    }catch(err){
        return res.status(401).json({message: "Invalid or expired token"});
    }   
}