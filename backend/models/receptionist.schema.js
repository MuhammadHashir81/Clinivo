import mongoose from "mongoose";

const receptionistSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        clinicId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clinic",
            required: true
        },

        phone: {
            type: String,
            required: true
        },

        shift: {
            type: String,
            enum: ["morning", "evening"],
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Receptionist = mongoose.model("Receptionist", receptionistSchema);
