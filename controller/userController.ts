import { NextFunction, Request, Response } from "express";
import UserModel, { User } from "../model/userSchema";
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { SignUpDTO } from "../dto/signUpDTO";
import { LoginDTO } from "../dto/loginDTO";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';


export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const signUpData = plainToClass(SignUpDTO, req.body);

        // Validate sign-up data using DTO
        const errors = await validate(signUpData);
        if (errors.length > 0) {
            res.status(400).json({ message: "Invalid sign-up data", errors });
            return;
        }

        const existingUser: User | null = await UserModel.findOne({ username: req.body.email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" ,success:false});
            return;
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        await UserModel.create({ ...req.body, password: hashedPassword });
        res.status(200).json({ success: true, message: 'Successfully signed up' });
    } catch (err) {
        next(err);
    }
};


const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const loginData = plainToClass(LoginDTO, req.body);

        // Validate login data using DTO
        const errors = await validate(loginData);
        if (errors.length > 0) {
            res.status(400).json({ message: "Invalid login data", errors });
            return;
        }

        const user: User | null = await UserModel.findOne({ username: req.body.email });
        if (!user) {
            res.status(400).json({ message: "No such user",success:false });
            return;
        }

        // Compare
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (passwordMatch) {
            const token = jwt.sign({ id: user._id, username: user.email }, process.env.SECRET_KEY as string);
            res.status(200).json({ success: true, message: "Login successful", token: token,});
        } else {
            res.status(400).json({ message: "Wrong password" });
        }
    } catch (err) {
        next(err);
    }
};

//  find all the users with pagination
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10; 
        const users: User[] = await UserModel.find()
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json({
            success: true,
            page,
            users
        });
    } catch (err) {
        next(err);
    }
};