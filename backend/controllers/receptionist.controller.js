import Appointment from "../models/appointment.model.js";
const handleAppointment = async (req, res) => {
    try {
        const { userId } = req

        const { doctorId, name, gender, phone, doctorName, visitType, reasonForVisit, visitDate, visitTime } = req.body;

        const appointment = await Appointment.create({
            userId,
            clinicId,
            doctorId,
            name,
            gender,
            phone,  
            doctorName,
            reasonForVisit,
            visitType,
            visitDate,
            visitTime
        });

        res.status(201).json({ message: "Appointment booked successfully", appointment });

    } catch (error) {
        res.status(500).json({ message: "Error booking appointment", error });
    }
} 


export { handleAppointment }