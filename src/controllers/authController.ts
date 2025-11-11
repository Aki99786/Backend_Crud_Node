import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const default_EMAIL = "admin@example.com";
const default_PASSWORD = "admin123";
const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";

export async function login(req: Request, res: Response) {
    try{
        const { email, password } = req.body;

        if (email === default_EMAIL && password === default_PASSWORD) {
            const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ token });
        }

        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '6h' });
        return res.status(200).json({ token });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}