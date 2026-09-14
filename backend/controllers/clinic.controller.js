import { Clinic } from "../models/clinic.schema.js"
import { ClinicValidation } from "../validations/ClinicValidation.js"

export const createClinic = async(req,res)=>{
    try {
        const {name,address,phone } = req.body

        const result = ClinicValidation.safeParse(req.body)

        if (!result.success) {
            console.log(result.error.issues)
            return res.status(400).json(result.error.issues)


        } else {
            console.log("Validated data:", result.data);
        }


        
        const isNameExists = await Clinic.findOne({name})


        if(isNameExists){
            return res.status(400).json({error:'this name already exists please choose another'})
        }

        const clinic = await Clinic.create({
            name,
            address,
            phone
        })
        

        return res.status(200).json({clinic:clinic, success:'clinic created'})

    } catch (error) {

        return res.status(500).json({error:error.message})
        
    }
}