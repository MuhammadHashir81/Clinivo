
import { Router } from "express";
import { createStaff,deleteStaff,getAllDoctors,getAllReceptionists,getDoctorStats,getReceptionist,getReceptionistsStats,loginStaff, updateStaff } from "../controllers/admin.staff.controller.js";
import {verifyUser} from '../middleware/AuthMiddleware.js'

export const staffRouter = Router()


//staff

staffRouter.post('/create', verifyUser,  createStaff)
staffRouter.post('/login',   loginStaff) 
staffRouter.get('/get-all/doctors', verifyUser, getAllDoctors)
staffRouter.get('/get/all/stats/doctors/',verifyUser,getDoctorStats)
staffRouter.get('/get/all/stats/receptionists',verifyUser, getReceptionistsStats)
staffRouter.get('/get-all-receptionists',verifyUser,getAllReceptionists) 
staffRouter.patch('/update/:staffId',verifyUser,updateStaff)
staffRouter.delete('/delete/:staffId',verifyUser, deleteStaff)
staffRouter.get('/get/receptionist',verifyUser, getReceptionist)


//staff