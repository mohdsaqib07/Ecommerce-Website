import { Schema,model,models } from "mongoose";

const forgotSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique:true
  },
  token: {
    type: String,
    required: true,

  }
  // Additional fields and their types can be added here
},{timestamps:true});

const Forgot = models.Forgot || model('Forgot', forgotSchema) 
export default Forgot;
