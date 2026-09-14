import mongoose from "mongoose"
import { Schema } from "mongoose"

const clinicSchema = new Schema({
    name: {
        type: String,
    },

    address: {
        type: String
    },

    phone: {
        type: String
    }
}, {
    timestamps: true
})

export const Clinic = mongoose.model('Clinic', clinicSchema)

