import express from 'express';
import { getUsers, login, signUp } from '../controller/userController';


const router=express.Router()

router.post('/signup',signUp)
router.post('/login',login)
router.get('/allusers',getUsers)

export default router