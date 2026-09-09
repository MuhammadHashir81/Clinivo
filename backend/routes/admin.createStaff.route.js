
import { Router } from "express";
import { createStaff,loginStaff } from "../controllers/admin.createStaff.controller.js";


export const createStaffRouter = Router()


//staff

createStaffRouter.post('/create', createStaff)
createStaffRouter.post('/login', loginStaff)
    
//staff