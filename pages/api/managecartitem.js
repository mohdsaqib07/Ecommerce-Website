import jwt from 'jsonwebtoken'
import  { connectDB,disconnectDB } from '@/middleware/db'; // Import the connectDB function
import Cart from '@/models/Cart';
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
export default async function handler(req,res){
    if(req.method==='POST'){
     await connectDB();
     let user = await middleware(req.headers.authtoken);  
    if(!user){
     return res.status(500).json({success:false})
     }
     const {itemCode,operation} = req.body;
     if(operation==='clear'){
        await Cart.deleteMany({user:user.id})
        return res.status(200).json({success:true})
     }
     let updateditem;
     if(operation==='increment')
     {
        await Cart.findOneAndUpdate({itemCode:itemCode,user:user.id}, { $inc: { qty: 1 }})
     }
     else if(operation==='decrement'){
        await Cart.findOneAndUpdate({itemCode:itemCode,user:user.id}, { $inc: { qty: -1 }})
     }
     updateditem = await Cart.findOne({itemCode:itemCode,user:user.id})
     if(updateditem.qty===0){
        await Cart.findOneAndDelete({itemCode:itemCode,user:user.id})
     }
     console.log(updateditem)
     
     res.status(200).json({success:true})
    }
    else{
        res.status(500).end();
    }
}