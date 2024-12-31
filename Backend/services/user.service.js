import { User } from "../models/user.model.js";
export const createUser = async ({ email, password }) => {
  try {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    return await User.create({
      email,
      password,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async({userId})=>{
  try {
    const allusers = await User.find({_id:{$ne:userId}});
    return allusers;
  } catch (error) {
   console.log(error);
    
  }
}
