import { Schema,model,models } from "mongoose";

const userSchema = new Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    required: true,
  }
  // Additional fields and their types can be added here
},{timestamps:true});

const User = models.User || model('User', userSchema) 
export default User;
