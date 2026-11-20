import { Appointment } from "../models/appointment.schema.js";
import { Clinic } from "../models/clinic.schema.js";
import { Receptionist } from "../models/receptionist.schema.js";
import mongoose from "mongoose";

// create appointments
const handleAppointment = async (req, res) => {
    try {
        const { userId } = req

        const clinicId = await Receptionist.findOne({ userId }).select('clinicId')

        const { doctorId, name, gender, phone, doctorName } = req.body;

        const appointment = await Appointment.create({
            userId,
            clinicId: clinicId.clinicId,
            doctorId,
            name,
            gender,
            phone,
            doctorName,
        });

        res.status(201).json({ message: "Appointment booked successfully", appointment });

    } catch (error) {
        res.status(500).json({ message: "Error booking appointment", error });
    }
}

// get all appointments
const handleGetAppointments = async (req, res) => {
    try {
        const { userId } = req;

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;





        const search = req.query.search || "";

        const result = await Receptionist.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId)
                }

            },

            {
                $lookup: {
                    from: "appointments",
                    localField: "clinicId",
                    foreignField: "clinicId",
                    as: 'appointment'
                }
            },

            {
                $unwind: "$appointment"
            },

            ...(search
                ? [
                    {
                        $match: {
                            $or: [
                                {
                                    "appointment.name": {
                                        $regex: search,
                                        $options: "i"
                                    }
                                },
                                {
                                    "appointment.doctorName": {
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
                    appointments: [
                        { $sort: { 'appointment.createdAt': -1 } },
                        { $skip: skip },
                        { $limit: limit },
                        {
                            $project: {
                                _id: "$appointment._id",
                                doctorId: "$appointment.doctorId",
                                clinicId: '$appointment.clinicId',
                                name: "$appointment.name",
                                doctorName: "$appointment.doctorName",
                                phone: "$appointment.phone",
                                gender: "$appointment.gender",
                                status: "$appointment.status",
                                date: "$appointment.createdAt"
                            }
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


        const appointments = result[0]?.appointments
        const totalAppointments = result[0]?.total[0]?.count || 0;
        const totalPages = Math.ceil(totalAppointments / limit);


        const clinic = await Receptionist.findOne({ userId }).select('clinicId');

        const getAllAppointments = await Appointment.find({
            clinicId: clinic.clinicId
        });


        const getWaitingStatus = await Appointment.find({
            clinicId: clinic.clinicId,
            status: 'waiting'
        });




        res.status(200).json({
            appointments: appointments,
            totalPages,
            totalAppointments,
            getAllAppointments,
            getWaitingStatus

        })

    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}


export { handleAppointment, handleGetAppointments }