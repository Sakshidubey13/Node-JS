import auth from "../models/userModel.js"; 
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const result = await auth.create({
            email,
            password: hash,
            name
        });
        return res.status(200).json({
            status: true,
            message: "user register successfully !!",
            data: result
        });
    } catch (err) {
        return res.json({
            status: false,
            message: "user register failed !!",
            err: err.message
        });
    }
};

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await auth.findOne({ email });
        if (!result) {
            return res.json({
                status: false,
                message: "email invalid !!"
            });
        }

        const isMatch = await bcrypt.compare(password, result.password);
        if (!isMatch) {
            return res.json({
                status: false,
                message: "password Wrong !!"
            });
        }
        const token = jwt.sign({
            email: result.email,
            name: result.name
        }, "!@#$%^&*()", { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60
        });

        return res.json({
            status: true,
            message: "user SignIn successfully",
            user: {
                name: result.name,
                email: result.email
            }
        });
    } catch (err) {
        return res.json({
            status: false,
            message: "user signIn failed !!",
            err: err.message
        });
    }
};

export const getprofile = async (req, res) => {
    try {
        const user = await auth.findOne({ email: req.body.email });
        return res.json({
            status: true,
            message: "user profile fetched successfully !!",
            profile: user
        });
    } catch (err) {
        return res.json({
            status: false,
            message: "user profile fetching failed !!",
            err: err.message
        });
    }
};
