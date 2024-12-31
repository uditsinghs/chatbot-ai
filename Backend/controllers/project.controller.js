import { Project } from "../models/project.model.js";
import {
  addUserToProject,
  createProject,
  getSingleProject,
} from "../services/project.service.js";
import { User } from "../models/user.model.js";
import { validationResult } from "express-validator";
export const createProjectController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name } = req.body;
    const { email } = req.user;
    const loggedInUser = await User.findOne({ email });
    const userId = loggedInUser._id;
    const newProject = await createProject({ name, userId });
    res.status(201).json(newProject);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllProjectsController = async (req, res) => {
  try {
    const { email } = req.user;
    const loggedInUser = await User.findOne({ email });
    const userId = loggedInUser._id;
    const allProjects = await Project.find({ users: userId });
    if (allProjects.length === 0) {
      return res.status(400).json({
        message: "No Project Found",
      });
    }
    return res.status(200).json(allProjects);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const addUserController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { projectId, users } = req.body;
    const { email } = req.user;
    const loggedInUser = await User.findOne({ email });

    const project = await addUserToProject({
      users,
      projectId,
      userId: loggedInUser._id,
    });
    res.status(200).json(project);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getSingleProjectController = async (req, res) => {
  const { projectId } = req.params;
  const project = await getSingleProject(projectId);
  return res.status(200).json(project);
};
