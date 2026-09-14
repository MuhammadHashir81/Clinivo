    import { Router } from "express";
    import { checkingUserAuth, login, refreshAccessToken, signup } from "../controllers/user.auth.controller.js";

    import { verifyUser } from "../middleware/AuthMiddleware.js";
    export const authRouter = Router()

    authRouter.post('/signup',signup)
    authRouter.post('/login',login)
    authRouter.post('/refresh-access-token', refreshAccessToken)
    authRouter.get('/check',verifyUser, checkingUserAuth)