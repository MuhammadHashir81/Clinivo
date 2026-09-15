import mongoose from "mongoose";

const { Schema } = mongoose;

const PatientSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        clinicId:{
            type:Schema.Types.ObjectId,
            ref:"Clinic",
            required:true
        },

        dateOfBirth: {
            type: Date
        },

        gender: {
            type: String,
            enum: ["male", "female", "other"]
        },

        address: {
            type: String
        },

        emergencyContact: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const Patient = mongoose.model("Patient", PatientSchema);

export { Patient };