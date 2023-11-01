import { connectDB,disconnectDB } from "@/middleware/db";
import Address from "@/models/Address";
import jwt from 'jsonwebtoken'
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
    if(req.method === "POST"){
        try{
            await connectDB();
            const token = req.headers.authtoken;

           
 
            const user = await middleware(token)
         
            if(!user){
            return res.status(500).json({success:false})
            }
  
            
            


            const add =await Address.findOne({user:user.id})
           
            console.log(add)
          
            res.status(200).json({success:true,address:add})
            // disconnectDB();

        }
        catch(err){
            console.log(err.message)
            res.status(500).json({error:err});
        }
    }
    else{
        res.status(405).end();
    }
}