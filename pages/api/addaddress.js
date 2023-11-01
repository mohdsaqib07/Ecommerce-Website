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
            let data = req.body.data;
           
 
            const user = await middleware(token)
         
            if(!user){
            return res.status(500).json({success:false})
            }
  
            
            
            const options = {
    upsert: true, // Create a new document if no matching document is found
    new: true, // Return the updated document instead of the original document
};

            const add =await Address.findOneAndUpdate({user:user.id},data,options)
           
            console.log(add)
          
            res.status(200).json({success:true})
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