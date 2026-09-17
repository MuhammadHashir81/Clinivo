import mongoose from 'mongoose'
const { Schema } = mongoose 

const DoctorSchema = new Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        reqruired:true
    },
   
    clinicId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Clinic',
    required:true
    },

    phone:{
     type:String
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

    
},  
  {
    timeStamps:true
  }
)

export const Doctor =  mongoose.model('Doctor',DoctorSchema)


