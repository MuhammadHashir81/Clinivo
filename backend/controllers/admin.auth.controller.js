import { User } from "../models/user.schema.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { userAccessToken, userRefreshToken } from "../utils/Generate_Token.js";
import { cookieOptions } from "../utils/Generate_Token.js";


// CREATE  ADMIN
export const signupAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(name,email,password);
        
        // Check if an admin already exists
        const existingAdmin = await User.findOne({name:name, role: "admin" });

        if (existingAdmin) {
            return res.status(400).json({
                error: "email has been taken already"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);



        // Create admin
        const admin = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "admin"
        });

        return res.status(201).json({
            success: "Admin created successfully",
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        });
    }
};



// LOGIN ADMIN
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find admin
        const admin = await User.findOne({
            email,
            role: "admin"
        });

        if (!admin) {
            return res.status(400).json({
                error: "Invalid admin email or password"
            });
        }

        // Compare password
        const isPasswordMatch =  bcrypt.compare(
            password,
            admin.password
        );

        if (!isPasswordMatch) {
            return res.status(400).json({
                error: "Invalid admin email or password"
            });
        }

        // Generate tokens
        const accessToken = userAccessToken(
            admin._id,
            admin.role
        );

        const refreshToken = userRefreshToken(
            admin._id
        );

        // Store tokens in cookies
        res.cookie(
            "accessToken",
            accessToken,
            {
                ...cookieOptions,
                maxAge: 15 * 60 * 1000
            }
        );

        res.cookie(
            "refreshToken",
            refreshToken,
            cookieOptions
        );

        return res.status(200).json({
            success: "Admin login successful",
            user: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error.message
        });
    }
};



