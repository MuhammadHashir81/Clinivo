    import { Router } from "express";
    import { checkingUserAuth, login, logoutUser, refreshAccessToken, signup } from "../controllers/user.auth.controller.js";

    import { verifyUser } from "../middleware/AuthMiddleware.js";
    export const authRouter = Router()

    authRouter.post('/signup',signup)
    authRouter.post('/login',login)
    authRouter.post('/logout',logoutUser)
    authRouter.post('/refresh-access-token', refreshAccessToken)
    authRouter.get('/check',verifyUser, checkingUserAuth)