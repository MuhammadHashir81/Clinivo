import mongoose from 'mongoose'
const { Schema } = mongoose 

const UserSchema = new Schema({
    
    name:{
        type:String,
        required:true,
        min:[3, 'name should contain atleast 3 characters']
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
    },

    role:{
        type:String,
        enum:['patient','admin','receptionalist','doctor'],
        default:'patient'
    }

})

const User =  mongoose.model('User',UserSchema)

export { User }
