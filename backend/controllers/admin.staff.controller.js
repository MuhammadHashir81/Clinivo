import bcrypt from "bcryptjs";
import { User } from "../models/user.schema.js";
import { userAccessToken, userRefreshToken } from "../utils/Generate_Token.js";
import { cookieOptions } from "../utils/Generate_Token.js";
import { DoctorFormSchema } from "../validations/DoctorFormValidation.js";
import { Doctor } from "../models/doctor.schema.js";
import { Clinic } from "../models/clinic.schema.js";
import mongoose from "mongoose";
import {Receptionist} from "../models/receptionist.schema.js";

export const createStaff = async (req, res) => {
    try {
        const { userId } = req;

        
        const {
            name,
            email,
            password,
            phone,
            specialization,
            experience,
            role,
            consultationFee,
            bio,
            shift
        } = req.body;
         

        console.log(req.body)
        // Find the clinic owned by the logged-in admin
        const clinic = await Clinic.findOne({
            ownerId: userId
        });

        if (!clinic) {
            return res.status(400).json({
                error: "Please create a clinic before creating a doctor"
            });
        }

        // Find doctor users with this email
        const existingUsers = await User.find({
            email: email,
            role: role
        });

        // Check whether this doctor already ex`ists in THIS clinic
        for (const existingUser of existingUsers) {

            let staffAlreadyExists;

            if(role === "doctor"){

                staffAlreadyExists = await Doctor.findOne({
                userId: existingUser._id,
                clinicId: clinic._id

            });
        }
           if (role === "receptionist") {

                staffAlreadyExists = await Receptionist.findOne({
                    userId: existingUser._id,
                    clinicId: clinic._id
                    
                });
            }

             if (staffAlreadyExists) {
                return res.status(400).json({
                    error: `${role} with this email already exists`
                });
            }

        }

        // Create a NEW User for this clinic
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            role: role

        });


        let staff;


          if (role === "doctor") {
            staff = await Doctor.create({
                userId: user._id,
                clinicId: clinic._id,
                phone,  
                specialization,
                experience,
                consultationFee,
                bio
            });
        }




          // Create Receptionist
        if (role === "receptionist") {
            staff = await Receptionist.create({
                userId: user._id,
                clinicId: clinic._id,
                phone,
                shift
            });
        }

         return res.status(201).json({
            success: `${role} created`,
            staff
        }); 



    } catch (error) {
        console.log(error);

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
                $in: ["doctor", "receptionist"]
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
        const { userId } = req;

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const search = req.query.search || "";

        const result = await Clinic.aggregate([
            {
                $match: {
                    ownerId: new mongoose.Types.ObjectId(userId)
                }
            },

            {
                $lookup: {
                    from: "doctors",
                    localField: "_id",
                    foreignField: "clinicId",
                    as: "doctorDetails"
                }
            },

            {
                $unwind: "$doctorDetails"
            },

            {
                $lookup: {
                    from: "users",
                    localField: "doctorDetails.userId",
                    foreignField: "_id",
                    as: "doctors"
                }
            },

            {
                $unwind: "$doctors"
            },

            // Search
            ...(search
                ? [
                    {
                        $match: {
                            $or: [
                                {
                                    "doctors.name": {
                                        $regex: search,
                                        $options: "i"
                                    }
                                },
                                {
                                    "doctors.email": {
                                        $regex: search,
                                        $options: "i"
                                    }
                                }
                            ]
                        }
                    }
                ]
                : []),

            // Pagination + Count
            {
                $facet: {
                    doctors: [
                        {
                            $project: {
                                _id: "$doctors._id",
                                name: "$doctors.name",
                                email: "$doctors.email",
                                phone: "$doctorDetails.phone",
                                consultationFee: "$doctorDetails.consultationFee",
                                specialization: "$doctorDetails.specialization",
                                experience: "$doctorDetails.experience",
                                date: "$doctors.createdAt"
                            }
                        },

                        {
                            $skip: skip
                        },

                        {
                            $limit: limit
                        }
                    ],

                    total: [
                        {
                            $count: "count"
                        }
                    ]
                }
            }
        ]);

        const doctors = result[0]?.doctors || [];

        const totalDoctors = result[0]?.total[0]?.count || 0;

        const totalPages = Math.ceil(totalDoctors / limit);

        return res.status(200).json({
            doctors,
            totalDoctors,
            totalPages
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            error: error.message
        });
    }
};


export const getAllReceptionists = async(req,res)=>{
    try {
        const { userId } = req
        
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const search = req.query.search || "";

        const result = await Clinic.aggregate([
            {
                $match:{
                    ownerId: new mongoose.Types.ObjectId(userId)
                },

                
            }
        ])


    } catch (error) {
        
    }
}



