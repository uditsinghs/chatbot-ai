import express from "express";
const router = express.Router();
import {createUserController, loginController,logoutController,profileController} from '../controllers/user.controller.js'
import {body} from 'express-validator'
import { isAuthenticated } from "../middlewares/auth.middleware.js";

router.post('/register', body('email').isEmail().withMessage("Email must be  a valid email address"),
body('password').isLength({min:3}).withMessage("Password must be atleast 3 character long"),createUserController)

router.post('/login', body('email').isEmail().withMessage("Email must be  a valid email address"),
body('password').isLength({min:3}).withMessage("Password must be atleast 3 character long"),loginController)

router.get('/profile',isAuthenticated,profileController)
router.get('/logout',logoutController)
export default router;
