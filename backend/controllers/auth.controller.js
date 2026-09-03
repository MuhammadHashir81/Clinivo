import { User } from "../models/user.schema.js"
import { SignupSchema } from "../validations/authSchema.js"
import bcrypt from 'bcryptjs'
import { cookieOptions, userAccessToken, userRefreshToken } from "../utils/Generate_Token.js";
import jwt from 'jsonwebtoken'

// singup controller
export const signUp = async (req, res) => {
    const { name, email, password } = req.body

    try {

        const result = SignupSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json(result.error.issues)

        } else {
            console.log("Validated data:", result.data);
        }

        const isEmailExists = await User.findOne({ email })

        if (isEmailExists) {
            return res.status(400).json({ error: 'this email already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)


        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        return res.status(201).json({
            user,
            success: 'signup successfully'
        })




    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(error)
    }

}


// login controller
export const logIn = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log('this is email',email)


        const user = await User.findOne({ email })

        if (user) {
            const isPasswordMatch = bcrypt.compare(password, user.password)

            if (isPasswordMatch) {

                const accessToken = userAccessToken(user._id,user.role)
                const refreshToken = userRefreshToken(user._id,user.role)
                
                res.cookie('accessToken', accessToken,{...cookieOptions, maxAge: 15 * 60 * 1000})
                res.cookie('refreshToken', refreshToken, cookieOptions)

                return res.status(200).json({
                     success: 'login successfully',
                     role:user.role
                     })
            }

            else {
                return res.status(400).json({ error: 'invalid password' })
            }
        }

        return res.status(400).json({ error: 'invalid email ' })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}


//logout 
export const logoutUser = (req, res) => {
    try {
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')
        return res.status(200).json({ message: 'logged out successfully' })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


// refresh access token 
export const refreshAccessToken = async(req,res)=>{
    try {
        const incomingRefreshToken = req.cookies.refreshToken 

        if(!incomingRefreshToken){
            return res.status(401).json({
                error:'login please',
                tokenExpired:true
            })
        }
    
        const decoded = jwt.verify(userRefreshToken, process.env.JWT_REFRESH_TOKEN)
        const user = await User.findById(decoded.id)

        if(!user){
            return res.status(401).json({
                error:'login please',
                tokenExpired:true
            })
        }

        const accessToken = userAccessToken(user._id,user.role)

        res.cookie('accessToken',accessToken,{...cookieOptions, maxAge: 15 * 60 *  1000})

        
        return res.status(200).json({
            success: 'token refreshed'
        })


    } catch (error) {
        return res.status(500).json({ error:error.message })
        
    }
}


// checking user on every refresh
export const checkingUserAuth = async(req,res)=>{
    try {
        const { userId } = req

        const user = await User.findById(userId)

        if(!user){
            return res.status(401).json({
                error:'please login',
                tokenExpired:true
                })
        }

        return res.status(200).json({user})

    } catch (error) {
        
        return res.status(500).json({error:error.message})
        
    }
}