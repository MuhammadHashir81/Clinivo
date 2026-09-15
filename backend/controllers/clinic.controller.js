import { Clinic } from "../models/clinic.schema.js"
import { ClinicValidation } from "../validations/ClinicValidation.js"
import { User } from "../models/user.schema.js"

export const createClinic = async(req,res)=>{
    try {

        const {userId} = req


        const clinicOwner = await User.findById(userId)

        if(!clinicOwner){
            return res.status(400).json({error:'please login first to create clinic'})
        }


        const ownerId = clinicOwner._id
        const {name,address,phone } = req.body

        const result = ClinicValidation.safeParse(req.body)

        if (!result.success) {
            console.log(result.error.issues)
            return res.status(400).json(result.error.issues)


        } else {
            console.log("Validated data:", result.data);
        }

        const isOwnerExists = await Clinic.findOne({ownerId:userId})

        if(isOwnerExists){
            return res.status(400).json({error:`you have already created clinic '${isOwnerExists.name}'`})
        }
        
        const isNameExists = await Clinic.findOne({name})


        if(isNameExists){
            return res.status(400).json({error:'this clinic name has been taken already'})
        }

        const clinic = await Clinic.create({
            name,
            address,
            phone,
            ownerId:ownerId
        })
        

        return res.status(200).json({clinic:clinic, success:'clinic created'})

    } catch (error) {

        return res.status(500).json({error:error.message})
        
    }
}