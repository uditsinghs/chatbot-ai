import jwt from "jsonwebtoken";
import redisClient from "../services/redis.service.js";
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }
    const isBlacklisted = await redisClient.get(token);
    if (isBlacklisted) {
      res.cookie("token", "");
      return res.status(401).json({
        message: "unauthorized user",
      });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decode", decode);

    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
};
