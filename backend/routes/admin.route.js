import { Router } from "express";
import { loginAdmin, signupAdmin } from "../controllers/admin.auth.controller.js";

const adminRouter = Router() 

// admin 
adminRouter.post('/signup', signupAdmin)
adminRouter.post('/login',loginAdmin)
//admin


export { adminRouter }