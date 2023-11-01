import mongoose from "mongoose";


var ProductSchema = new mongoose.Schema({
  // Reference to the User schema using ObjectId
  title: {
    type: String,
    required:true, // Reference the 'User' model
    unique:false,
  },
  slug:{
    type: String,
    required:true, // Reference the
    unique:true,
  },
  image:{
    type: String,
    default:"https://upload.wikimedia.org"
  },
  price: Number,
  size: String,
  desc: String,
  category: String,
  color: String,
  availableQty: Number,
  
  
  // ... other fields in your Product schema
},{timestamps:true});


const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema) 
export default Product;
