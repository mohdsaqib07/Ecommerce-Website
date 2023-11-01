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
     const items = await Cart.find({user:user.id})
     res.status(200).json({success:true,items})
    }
    else{
        res.status(500).end();
    }
}