import { Router } from "express";
import { checkingUserAuth, logIn, signUp } from "../controllers/auth.controller.js";

export const authRouter = Router()

authRouter.post('/signup',signUp)
authRouter.post('/login',logIn)
authRouter.post('/check',checkingUserAuth)