import bcrypt from "bcryptjs";
import { User } from "../models/user.schema.js";
import { userAccessToken, userRefreshToken } from "../utils/Generate_Token.js";
import { cookieOptions } from "../utils/Generate_Token.js";
import { DoctorFormSchema } from "../validations/DoctorFormValidation.js";
import { Doctor } from "../models/doctor.schema.js";
import { Clinic } from "../models/clinic.schema.js";
import mongoose from "mongoose";


// CREATE STAFF
export const createStaff = async (req, res) => {
    try {

        const { userId } = req
        
        const { name, email, password, role, phone, specialization, experience, consultationFee, bio } = req.body;

        console.log('this is role',role)    


        // Only doctor and receptionist can be created as staff
        const allowedRoles = ["doctor", "receptionalist"];

        if (!allowedRoles.includes(role)) {
            return res.status(400).json({
                error: "Invalid staff role"
            });
        }


        const clinic = await Clinic.findOne({ ownerId: userId })


        if (!clinic) {

        return res.status(400).json({ error: 'please create clinic before creating a doctor' })

        }

            const existingUser = await User.findOne({ email,role })
            console.log(existingUser)

            if(existingUser) {

                const doctorAlreadyInClinic = await Doctor.findOne({
                    userId:userId,
                    clinicId:clinic._id
                })

                if(doctorAlreadyInClinic){
                    return res.status(400).json({
                        error:'doctor already exists'
                    })
                }

            }

            if(role === 'doctor'){

                const hashedPassword = await bcrypt.hash(password,10)
                const user = await User.create({
                    name,
                    email,
                    role,
                    password:hashedPassword
                })

                const doctor = await Doctor.create({
                    userId:user._id,
                    clinicId:userId,
                    phone,
                    specialization,
                    experience,
                    consultationFee,
                })

                return res.status(201).json({
                    success:'doctor created',
                    doctor
                })

                
            }



    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error.message
        });
    }
};



// LOGIN STAFF
export const loginStaff = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find staff
        const staff = await User.findOne({
            email,
            role: {
                $in: ["doctor", "receptionalist"]
            }
        });

        if (!staff) {
            return res.status(401).json({
                error: "Invalid staff email or password"
            });
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(
            password,
            staff.password
        );

        if (!isPasswordMatch) {
            return res.status(401).json({
                error: "Invalid staff email or password"
            });
        }

        // Generate tokens
        const accessToken = userAccessToken(
            staff._id,
            staff.role
        );

        const refreshToken = userRefreshToken(
            staff._id
        );

        // Store tokens in cookies
        res.cookie(
            "accessToken",
            accessToken,
            {
                ...cookieOptions,
                maxAge: 15 * 60 * 1000
            }
        );

        res.cookie(
            "refreshToken",
            refreshToken,
            cookieOptions
        );

        return res.status(200).json({
            success: "Staff login successful",
            user: {
                id: staff._id,
                name: staff.name,
                email: staff.email,
                role: staff.role
            }
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};



// get all doctors

export const getAllDoctors = async (req, res) => {
    try {
        const { userId } = req

        const doctors = await Clinic.aggregate([
            {
                $match: {
                    ownerId: new mongoose.Types.ObjectId(userId)
                }
            },


            {
                $lookup: {
                    from: 'doctors',
                    localField: '_id',
                    foreignField: 'clinicId',
                    as: 'doctorDetails'
                }
            },
            {
                $unwind: '$doctorDetails'
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'doctorDetails.userId',
                    foreignField: '_id',
                    as: 'doctors'
                },

            },
            {
                $unwind: '$doctors'
            },

            {
                $project:{
                   _id:'$doctors._id',
                   'name':'$doctors.name',
                   'email':'$doctors.email',
                   'phone':'$doctorDetails.phone',
                   'consultationFee':'$doctorDetails.consultationFee',
                   'specialization':'$doctorDetails.specialization',
                   'experience':'$doctorDetails.experience',
                   'date':'$doctors.createdAt',
                }
            }
        ])


        return res.status(200).json({ doctors })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error })
    }

}




