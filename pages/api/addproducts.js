import { connectDB,disconnectDB } from "@/middleware/db";
import Product from "@/models/Product";

export default async function handler(req,res){
    if(req.method === "POST"){
        try{
            await connectDB();
            await Product.insertMany(req.body.products);
            res.status(200).json({success:true})
            disconnectDB();

        }
        catch(err){
            res.status(500).json({error:err});
        }
    }
    else{
        res.status(500).end();
    }
}