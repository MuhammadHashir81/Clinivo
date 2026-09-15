import { Router } from "express";
import { createClinic } from "../controllers/clinic.controller.js";
import { verifyUser } from "../middleware/AuthMiddleware.js";
export const clinicRouter = Router()

clinicRouter.post('/create',verifyUser, createClinic)