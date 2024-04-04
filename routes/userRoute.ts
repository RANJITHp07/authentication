import express from 'express';
import { getUsers, login, signUp } from '../controller/userController';
import verifyToken from '../middleware/jwtMiddleware';


const router=express.Router()

router.post('/signup',signUp)
router.post('/login',login)
router.get('/allusers',verifyToken, getUsers)

export default router