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
     const {itemCode , price , name , size , category , qty , image , color , slug , state} = req.body;
     let itemtogo = {
        user:user.id,
        itemCode:itemCode,
        price:price,
        name:name,
        size:size,
        category:category,
        qty:qty,
        image:image,
        color:color,
        slug:slug,
     }
     if(state==='instant'){
        await Cart.deleteMany({user:user.id})
     }

     const item = new Cart(itemtogo);
     await item.save();
     res.status(200).json({success:true})
    }
    else{
        res.status(500).end();
    }
}