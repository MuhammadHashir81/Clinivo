
import { Router } from "express";
import { createStaff,getAllDoctors,getAllReceptionists,loginStaff } from "../controllers/admin.staff.controller.js";
import {verifyUser} from '../middleware/AuthMiddleware.js'

export const staffRouter = Router()


//staff


staffRouter.post('/create', verifyUser,  createStaff)
staffRouter.post('/login',   loginStaff) 
staffRouter.get('/get-all/doctors', verifyUser, getAllDoctors)
staffRouter.get('/get-all-receptionists',verifyUser,getAllReceptionists) 

    
//staff