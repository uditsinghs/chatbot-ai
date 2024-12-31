import express from "express";
import { body } from "express-validator";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {
  createProjectController,
  getAllProjectsController,
  addUserController,
  getSingleProjectController,
} from "../controllers/project.controller.js";

const router = express.Router();

// Route to create a project
router.post(
  "/create",
  body("name").isString().withMessage("Name is required"),
  isAuthenticated,

  createProjectController
);

// Route to get all projects
router.get("/all", isAuthenticated, getAllProjectsController);

// Route to add users to a project
router.put(
  "/add-user",
  body("projectId").isString().withMessage("ProjectId must be a string"),
  body("users")
    .isArray({ min: 1 })
    .withMessage("Users must be an array")
    .bail()
    .custom((users) => users.every((user) => typeof user === "string"))
    .withMessage("Each user must be a string"),
  isAuthenticated,
  addUserController
);

router.get(
  "/get-single/:projectId",
  isAuthenticated,
  getSingleProjectController
);
export default router;
