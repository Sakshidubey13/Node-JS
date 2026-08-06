import jwt from "jsonwebtoken";


export const tokenMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({
      status: false,
      message: "user login required",
    });
  }
  try {
    if (!token) {
      return res.json({
        status: false,
        message: "Token missing !!",
      });
    }
    const cookieVerify = jwt.verify(token, "!@#$%^&*()");
    req.auth = cookieVerify;
    next();
  } catch (err) {
    return res.json({
      status: false,
      message: "Invalid or expired token",
      err: err.message,
    });
  }
};
