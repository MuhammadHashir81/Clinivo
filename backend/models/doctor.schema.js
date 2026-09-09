import mongoose from 'mongoose'
const { Schema } = mongoose 

const DoctorSchema = new Schema({

    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        reqruired:true
    },
   
    phone:{
     type:Number
    },

    specialization:{
        type:String
    },

    experience:{
     type:String
    },

    consultationFee:{
        type:Number
    },
    
})

const Doctor =  mongoose.model('Doctor',DoctorSchema)

export { Doctor }
