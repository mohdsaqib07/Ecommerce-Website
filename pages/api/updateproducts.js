import { connectDB,disconnectDB } from "@/middleware/db";
import Product from "@/models/Product";

export default async function handler(req,res){
    if(req.method === "PUT"){
        await connectDB();
        for(let i in req.body){
            let p = await Product.findByIdAndUpdate(req.body[i]._id,req.body[i]);
        }
        await disconnectDB();
        res.status(200).json({"success":true})
    }
    else{
        res.status(500).end();
    }
}