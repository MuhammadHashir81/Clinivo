import {Router} from "express";
import { updateDoctorStatus } from "../controllers/doctor.controller.js";

export const doctorRouter = Router();

doctorRouter.patch("/update-status/:id", updateDoctorStatus);