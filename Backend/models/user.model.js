import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: [50, "Email cannot be greater than 50 characters"],
    minlength: [6, "Email cannot be less than 6 characters"],
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

// Compare passwords
userSchema.methods.comparePassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

// Generate JWT token
userSchema.methods.generateToken = function () {
  return jwt.sign(
    { email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: "2d" }
  );
};

export const User = mongoose.model("User", userSchema);
