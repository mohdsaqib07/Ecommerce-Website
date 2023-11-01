import {Schema,model,models} from 'mongoose'
const orderSchema = new Schema({
  // Reference to the User schema using ObjectId
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required:true, // Reference the 'User' model
  },
  orderId:{
    type:String,
    required:true
  },
  products:[
    {
      productId:{
        type: String,
        required:true,
      },
      name:{
        type: String,
      },
      quantity:{
        type: Number,
        default: 1,
      },
      size:{
        type:String,
      },
      iPrice:Number,
      image:String,
      
    }
  ],
  address: {
   customername:String,
   email:String,
   phone:String,
   address1:String,
   address2:String,
   city:String,
   state:String,
   pincode:String,
},
amount: Number,
status:{
    type: String,
    default: 'Pending',
    required: true,
}
  // ... other fields in your Product schema
},{timestamps:true});


const Order = models.Order || model('Order', orderSchema); 
export default Order;
