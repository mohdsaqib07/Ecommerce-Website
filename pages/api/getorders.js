// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectDB,disconnectDB } from "@/middleware/db"
import Order from "@/models/Order"
import jwt from 'jsonwebtoken'
async function fetchuser(token){
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

export default async function handler(req, res) {
    if(req.method==='POST'){
      try{
           await connectDB();
           const token = req.headers.authtoken;
           const user = await fetchuser(token);
           const orders = await Order.find({user:user.id});
           // await disconnectDB();
           res.status(200).json({'success':true,orders})
        }
        catch(err){
            console.log('inside the catch of the api route')
            console.log(err.message)
            res.status(500).send("Internal Server Error")
        }
    }
    else{
       res.status(500).end();
    }
          
  }

  
  