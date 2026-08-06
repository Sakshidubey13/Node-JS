import auth from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const result = await auth.create({
      email,
      password: hash,
      name,
    });
    res.status(200).json({
      status: true,
      message: "user register successfully !!",
      data: result,
    });
  } catch (err) {
    res.json({
      status: false,
      message: "user register failled !!",
      err: err.message,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const auth = await auth.findOne({ email });
    if (!auth) {
      res.json({
        status: false,
        message: "email invalid  !!",
        err: err.message,
      });
    }
    const isMatch = bcrypt.compare(password, auth.password);
    if (!isMatch) {
      res.json({
        status: false,
        message: "password Worng !!",
      });
    }
    const token = JsonWebTokenError.sign(
      {
        email: auth.email,
        name: auth.name,
      },
      "!@#$%^&*()",
      { expiresIn: "1h" },
    );
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });
    res.json({
      status: true,
      message: "user SignIn succesfully",
      user: {
        name: auth.name,
        email: auth.email,
        password: auth.password,
      },
    });
  } catch (err) {
    res.json({
      status: false,
      message: "user signIN failled !!",
      err: err.message,
    });
  }
};
