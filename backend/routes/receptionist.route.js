import { Router } from "express";
import { verifyUser } from "../middleware/AuthMiddleware.js";
import { handleAppointment, handleGetAppointments } from "../controllers/receptionist.controller.js";

export const receptionistRouter = Router()

receptionistRouter.get('/appointment/get/all',handleGetAppointments)
receptionistRouter.post('/appointment/create',verifyUser, handleAppointment)  

