import { Appointment } from "../models/appointment.schema.js";
import { Clinic } from "../models/clinic.schema.js";
import { Receptionist } from "../models/receptionist.schema.js";

const handleAppointment = async (req, res) => {
    try {
        const { userId } = req

        const clinicId = await Receptionist.findOne({userId}).select('clinicId')
        console.log(clinicId)

        const { doctorId, name, gender, phone, doctorName  } = req.body;

        const appointment = await Appointment.create({
            userId,
            clinicId,
            doctorId,
            name,
            gender,
            phone,  
            doctorName,
        });

        res.status(201).json({ message: "Appointment booked successfully", appointment });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error booking appointment", error });
    }
} 


const handleGetAppointments = async (req,res) =>{
    try {
        const {userId} = req;

        const clinicId = await Receptionist.findOne({userId}).select('clinicId')
        console.log(clinicId)

        const appointments = await Appointment.find({clinicId:clinicId})
        res.status(200).json({appointments})

    } catch (error) {
        console.log(error)
        res.status(500).json({error:error.message})
        
    }
}

export { handleAppointment, handleGetAppointments }