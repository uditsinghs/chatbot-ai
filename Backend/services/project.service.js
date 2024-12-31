import mongoose from "mongoose";
import { Project } from "../models/project.model.js";

export const createProject = async ({ name, userId }) => {
  try {
    if (!name || !userId) {
      throw new Error("Name and UserId are required.");
    }

    const project = await Project.create({
      name,
      users: [userId],
    });

    return project;
  } catch (error) {
    if (error.code === 11000) {
      console.log(
        "Duplicate key error: A project with this name already exists."
      );
      throw new Error(
        "A project with this name already exists. Please choose a different name."
      );
    } else {
      console.log("Error creating project:", error.message);
      throw error; // Re-throw the error for further handling
    }
  }
};

export const addUserToProject = async ({users, projectId, userId}) => {
  try {
    if (!projectId) {
      throw new Error("project id is required");
    }
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      throw new Error("project id is invalid");
    }
    if (!userId) {
      throw new Error("user id is required");
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("user id is invalid");
    }
    if (!users) {
      throw new Error("users is required");
    }
    if (
      !Array.isArray(users) ||
      users.some((userId) => !mongoose.Types.ObjectId.isValid(userId))
    ) {
      throw new Error("user id is invalid");
    }

    const project = await Project.findOne({
      _id: projectId,
      users: userId,
    });
    if (!project) {
      throw new Error("user not belong to this Project");
    }

    const updatedProject = await Project.findByIdAndUpdate({_id:projectId},
      {
        $addToSet:{
          users:{
          $each:users
          }
        }
      },
      {new:true}
    );
    return updatedProject;
  } catch (error) {
    console.log(error);
  }
};


export const getSingleProject = async(projectId)=>{
  try {
    const project = await Project.findById(projectId).populate("users")
    return project;
  } catch (error) {
    console.log(error);
    
  }
}
