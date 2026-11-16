import { Router } from "express";
import { verifyUser } from "../middleware/AuthMiddleware.js";
import { handleAppointment } from "../controllers/receptionist.controller.js";

export const receptionistRouter = Router()

receptionistRouter.post('/appointment/create',handleAppointment)  

