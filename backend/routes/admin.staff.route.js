
import { Router } from "express";
import { createStaff,deleteStaff,getAllDoctors,getAllReceptionists,loginStaff, updateStaff } from "../controllers/admin.staff.controller.js";
import {verifyUser} from '../middleware/AuthMiddleware.js'

export const staffRouter = Router()


//staff

staffRouter.post('/create', verifyUser,  createStaff)
staffRouter.post('/login',   loginStaff) 
staffRouter.get('/get-all/doctors', verifyUser, getAllDoctors)
staffRouter.get('/get-all-receptionists',verifyUser,getAllReceptionists) 
staffRouter.patch('/update/:staffId',verifyUser,updateStaff)
staffRouter.delete('/delete/:staffId',verifyUser, deleteStaff)

//staff