import mongoose from "mongoose";

const { Schema } = mongoose;

const AppointmentSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        clinicId: {
            type: Schema.Types.ObjectId,
            ref: "Clinic",
            required: true
        },

        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
            required: true
        },

        name: {
            type: String,
            required: true,
        },

        gender: {
            type: String,
            enum: ["male", "female", "other"]
        },

        phone: {
            type: String,
            required: true
        },

        doctorName: {
            type: String,
            required: true
        },

        visitType: {
            type: String,
        },

        reasonForVisit: {
            type: String,
        },


        visitDate: {
            type: Date,
        },

        visitTime: {
            type: String,
        },

        status: {
            type: String,
            enum: [
                "waiting",
                "completed",
                "cancelled"
            ],
            default: "waiting",
        },

    },




);

const Appointment = mongoose.model("Appointment", AppointmentSchema);

export { Appointment };