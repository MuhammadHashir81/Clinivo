import bcrypt from "bcryptjs";
import { User } from "../models/user.schema.js";
import { userAccessToken, userRefreshToken } from "../utils/Generate_Token.js";
import { cookieOptions } from "../utils/Generate_Token.js";
import { DoctorFormSchema } from "../validations/DoctorFormValidation.js";


// CREATE STAFF
export const createStaff = async (req, res) => {
    try {
        const { name, email, password, role, phone, specialization, experience, consultationFee, bio } = req.body;

        const result = DoctorFormSchema.safeParse(req.body)

        if (!result.success) {
            return res.status(400).json(result.error.issues)

        } else {
            console.log("Validated data:", result.data);
        }




        // Only doctor and receptionist can be created as staff
        const allowedRoles = ["doctor", "receptionalist"];

        if (!allowedRoles.includes(role)) {
            return res.status(400).json({
                error: "Invalid staff role"
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                error: "This email already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create staff
        const staff = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        return res.status(201).json({
            success: "Staff created successfully",
            staff: {
                id: staff._id,
                name: staff.name,
                email: staff.email,
                role: staff.role
            }
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};




// LOGIN STAFF
export const loginStaff = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find staff
        const staff = await User.findOne({
            email,
            role: {
                $in: ["doctor", "receptionalist"]
            }
        });

        if (!staff) {
            return res.status(401).json({
                error: "Invalid staff email or password"
            });
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(
            password,
            staff.password
        );

        if (!isPasswordMatch) {
            return res.status(401).json({
                error: "Invalid staff email or password"
            });
        }

        // Generate tokens
        const accessToken = userAccessToken(
            staff._id,
            staff.role
        );

        const refreshToken = userRefreshToken(
            staff._id
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
            success: "Staff login successful",
            user: {
                id: staff._id,
                name: staff.name,
                email: staff.email,
                role: staff.role
            }
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};
