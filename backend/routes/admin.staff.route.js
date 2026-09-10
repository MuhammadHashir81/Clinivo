
import { Router } from "express";
import { createStaff,getAllDoctors,loginStaff } from "../controllers/admin.staff.controller.js";
import {verifyUser} from '../middleware/AuthMiddleware.js'

export const staffRouter = Router()


//staff

staffRouter.post('/create',   createStaff)
staffRouter.post('/login',   loginStaff) 
staffRouter.get('/get-all/doctors', getAllDoctors)    
    
//staff