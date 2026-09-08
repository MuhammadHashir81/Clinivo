
import { Router } from "express";
import { createStaff,loginStaff } from "../controllers/admin.createStaff.controller.js";


const createStaff = Router()


//staff
createStaff.post('/create/staff', createStaff)
createStaff.post('/login/staff', loginStaff)
//staff