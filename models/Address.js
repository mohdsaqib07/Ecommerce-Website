import { Schema,model,models } from "mongoose";

const addressSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required:true, // Reference the 'User' model
  },
  customername: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,

  },
  address1:{
    type: String,
    required: true,
  },
  address2:{
    type: String,
    required: true,
  },
  city:{
    type:String,
    required:true,
  },
  state:{
    type:String,
    required:true,
  },
  pincode:{
    type:String,
    required:true
  },
  // Additional fields and their types can be added here
},{timestamps:true});

const Address = models.Address || model('Address', addressSchema) 
export default Address;
