import {Schema,model,models} from 'mongoose'
const cartSchema = new Schema({
  // Reference to the User schema using ObjectId
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required:true, // Reference the 'User' model
  },
  itemCode:{
    type:String,
    required:true
  },
  price:Number,
  name:String,
  size:String,
  category:String,
  qty:Number,
  image:String,
  color:String,
  slug:String,
// ... other fields in your Product schema
},{timestamps:true});


const Cart = models.Cart || model('Cart', cartSchema); 
export default Cart;
