import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      email: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
        type:Date,
        default:Date.now
    },
    updatedAt: {
        type:Date,
        default:Date.now
    },
  },
  {
     timestamps:{
      createdAt:true,
      updatedAt:true,
     } 
});


userSchema.methods.toJson=function(){
  const obj= this.object();
  delete obj.password;
  return obj;
}

const User=
mongoose.model("User",userSchema)
export default User;
