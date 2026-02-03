import User from "../model/userModel.js";
import validator from "validator"
import bcrypt from "bcryptjs"
import { genToken, genToken1 } from "../config/token.js";


export const registration = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(400).json({ message: "User already exist" })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Enter valid Email" })
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" })
        }

        let hashPassword = await bcrypt.hash(password, 10)

        const user = await User.create({ name, email, password: hashPassword })
        let token = await genToken(user._id)
        const isProduction = process.env.NODE_ENV === 'production';
        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "None" : "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } catch (error) {
        console.error("Registration error:", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: "Validation error: " + error.message })
        }
        return res.status(500).json({ message: "Registration failed. Please try again later." })
    }

}


export const login = async (req, res) => {
    try {
        let { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" })
        }

        let user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User is not Found" })
        }
        let isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" })
        }
        let token = await genToken(user._id)
        const isProduction = process.env.NODE_ENV === 'production';
        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "None" : "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Login failed. Please try again later." })

    }

}
export const logOut = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({ message: "logOut successful" })
    } catch (error) {
        console.log("logOut error")
        return res.status(500).json({ message: `LogOut error ${error}` })
    }

}


export const googleLogin = async (req, res) => {
    try {
        let { name, email } = req.body;
        let user = await User.findOne({ email })
        if (!user) {
            user = await User.create({
                name, email
            })
        }

        let token = await genToken(user._id)
        const isProduction = process.env.NODE_ENV === 'production';
        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "None" : "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json(user)

    } catch (error) {
        console.error("googleLogin error:", error)
        return res.status(500).json({ message: error.message || "Google Login failed" })
    }

}


export const adminLogin = async (req, res) => {
    try {
        let { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            let token = await genToken1(email)
            const isProduction = process.env.NODE_ENV === 'production';
            const cookieOptions = {
                httpOnly: true,
                secure: isProduction,
                sameSite: isProduction ? "None" : "Strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            };

            res.cookie("token", token, cookieOptions);
            return res.status(200).json(token)
        }
        return res.status(400).json({ message: "Invaild creadintials" })

    } catch (error) {
        console.log("AdminLogin error")
        return res.status(500).json({ message: `AdminLogin error ${error}` })

    }

}

