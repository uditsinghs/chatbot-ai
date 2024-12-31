import mongoose from 'mongoose';
const projectShema  = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    trim:true,
    lowercase:true,
    unique:[true,"Name must be unique"]
  },
  users:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    }
  ]
})

export const Project = mongoose.model("Project",projectShema)