import { Router } from "express";
import { createClinic } from "../controllers/clinic.controller.js";

export const clinicRouter = Router()

clinicRouter.post('/create',createClinic)