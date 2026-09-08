import { Router } from "express";
import { checkingUserAuth, login, signup } from "../controllers/user.auth.controller.js";

export const authRouter = Router()

authRouter.post('/signup',signup)
authRouter.post('/login',login)
authRouter.post('/check',checkingUserAuth)