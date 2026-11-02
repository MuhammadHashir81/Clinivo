import { Doctor } from "../models/doctor.schema.js";


export const updateDoctorStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ["available", "off", "on leave", "break"];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: "Invalid doctor availability status" });
    }

    try {
        const doctor = await Doctor.findOne({userId: id});

        if (!doctor) {
            return res.status(404).json({ error: "Doctor not found" });
        }

        doctor.availability = status;
        await doctor.save();

        return res.json(doctor);

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};
