import { User } from "../models/user.model.js";
import { createUser, getAllUsers } from "../services/user.service.js";
import { validationResult } from "express-validator";
import redisClient from "../services/redis.service.js";

export const createUserController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await createUser(req.body);
    const token = await user.generateToken();
    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 2 * 24 * 60 * 60 * 1000,
      })
      .send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const loginController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        errors: "Please Provide email and password",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ errors: "user not found Please register." });
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      res.status(401).json({ errors: "invlaid user" });
    }

    const token = await user.generateToken();
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 2 * 24 * 60 * 60 * 1000,
      })
      .json({ message: "logged in." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const profileController = async (req, res) => {
  try {
    const { email } = req.user;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "unauthorized user",
      });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

export const logoutController = async (req, res) => {
  try {
    const token = req.cookies.token;
    redisClient.set(token, "logout", "EX", 60 * 24 * 24);
    res.status(200).json({
      message: "Logout successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message || "Internal server error.",
    });
  }
};

export const getAllUsersController = async () => {
  try {
    const loggedInUser = await User.findOne(req.user.email);
    const allUsers = await getAllUsers({ userId: loggedInUser._id });
    return res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
