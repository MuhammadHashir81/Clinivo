import bcrypt from "bcryptjs";
import { User } from "../models/user.schema.js";
import { userAccessToken, userRefreshToken } from "../utils/Generate_Token.js";
import { cookieOptions } from "../utils/Generate_Token.js";
import { DoctorFormSchema } from "../validations/DoctorFormValidation.js";
import { Doctor } from "../models/doctor.schema.js";
import { Clinic } from "../models/clinic.schema.js";
import mongoose from "mongoose";
import { Receptionist } from "../models/receptionist.schema.js";


// create staff
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


        const existingUser = await User.findOne({
            email: email
        });

        if (existingUser) {
            return res.status(400).json({
                error: "An account with this email already exists"
            });
        }

        // Create a NEW User for this clinic
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email: email.toLowerCase().trim(),
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


// login staff
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
                error: "Invalid email or password"
            });
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(
            password,
            staff.password
        );

        if (!isPasswordMatch) {
            return res.status(401).json({
                error: "Invalid email or password"
            });
        }



        let staffDetails;

        if (staff.role === 'doctor') {
            staffDetails = await Doctor.findOne({
                userId: staff._id,
            })
        }
        else {
            staffDetails = await Receptionist.findOne({
                userId: staff._id
            })
        }


        if (!staffDetails) {
            return res.status(403).json({
                error: "this account is not associated with a clinic"
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
        console.log(error)
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

// get all receptionists
export const getAllReceptionists = async (req, res) => {
    try {
        const { userId } = req

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const search = req.query.search || "";

        const result = await Clinic.aggregate([
            {
                $match: {
                    ownerId: new mongoose.Types.ObjectId(userId)
                },
            },
            {
                $lookup: {
                    from: 'receptionists',
                    localField: '_id',
                    foreignField: 'clinicId',
                    as: 'receptionistDetails'

                }
            },


            {
                $unwind: "$receptionistDetails"
            },


            {
                $lookup: {
                    from: "users",
                    localField: "receptionistDetails.userId",
                    foreignField: "_id",
                    as: "receptionists"
                }
            },

            {
                $unwind: "$receptionists"
            },


            ...(search
                ? [
                    {
                        $match: {
                            $or: [
                                {
                                    "receptionists.name": {
                                        $regex: search,
                                        $options: "i"
                                    }
                                },
                                {
                                    "receptionists.email": {
                                        $regex: search,
                                        $options: "i"
                                    }
                                }
                            ]
                        }
                    }
                ]
                : []),

            {
                $facet: {
                    receptionists: [
                        {
                            $project: {
                                _id: "$receptionists._id",
                                name: "$receptionists.name",
                                email: "$receptionists.email",
                                date: "$receptionists.createdAt",
                                phone: "$receptionistDetails.phone",
                                shift: "$receptionistDetails.shift",

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

        ])


        const receptionists = result[0]?.receptionists || [];

        const totalReceptionists = result[0]?.total[0]?.count || 0;

        const totalPages = Math.ceil(totalReceptionists / limit);


        return res.status(200).json({
            receptionists,
            totalReceptionists,
            totalPages
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error })

    }
}