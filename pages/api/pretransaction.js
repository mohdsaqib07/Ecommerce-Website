import jwt from 'jsonwebtoken';
import  { connectDB,disconnectDB } from '@/middleware/db'; // Import the connectDB function
import Order from '@/models/Order';
import Product from "@/models/Product";
import validator from 'validator';
function containsOnlyNumbers(inputString) {
  // Use a regular expression to match only numeric characters
  const regex = /^[0-9]+$/;
  return regex.test(inputString);
}
async function middleware(token) {
if(!token){
        return null;
    }
    try{
        const data = jwt.verify(token,process.env.JWT_SECRET)
        let user = data.user
        return user;
    }
    catch(err){
        return null;
    }
}
export default async function(req,res){
  if(req.method === 'POST'){
    const token = req.headers.authtoken;

    const user = await middleware(token)
    if(!user){
      return res.status(500).end();
    }
    let {orderId,cart,formData,subTotal} = req.body
   
      if (!validator.isEmail(formData.email)) {
    return res.status(400).json({ error: 'Invalid Email at the checkout details' });
     }
     if(!validator.isLength(formData.address1, { min: 8 }) || !validator.isLength(formData.address2,{min:8})){
    return res.status(400).json({ error: 'Put a Valid address in the checkout details' });
     }
     if(!validator.isLength(formData.pincode,{min:6}) || !containsOnlyNumbers(formData.pincode)){
      return res.status(400).json({error:"Invalid pincode"})
     }
     if(!validator.isLength(formData.phone,{min:10,max:10})){
      return res.status(400).json({error:"Invalid Phone Number"})
     }
    await connectDB();
    let items = [];
    let sumTotal = 0;
    for(let i in cart){
       let product = await Product.findById(i);
      if(product.availableQty<cart[i].qty){
       return res.status(400).json({error:"Some Items in your cart went out of stock please try again later"})
      }

       if(cart[i].price!==product.price){
         return res.status(400).json({cart:"Price of Some Items has been changed your cart Please readd the items in your cart to checkout the order"})
       }
       sumTotal+=cart[i].price * cart[i].qty
       let updateddata  = {availableQty:product.availableQty - cart[i].qty}
       await Product.findByIdAndUpdate(i,{$set:updateddata})

    }
    if(sumTotal!==subTotal){
      return res.status(500).json({cart:"Price of Some Items has been changed your cart Please readd the items in your cart to checkout the order"})
    }

    for(let i in cart){
      items.push({productId:i,name:cart[i].name,quantity:cart[i].qty,size:cart[i].size,iPrice:cart[i].price,image:cart[i].image})
    }
    const ordertogo = {
      user:user.id,
      orderId:orderId,
      products:items,
      address:formData,
      amount:subTotal,
    }
    const order = Order(ordertogo);
    await order.save();
    // await disconnectDB();
    res.status(200).json({ success: true,item:order });

  }
  else{
    res.status(500).end();
  }
}
