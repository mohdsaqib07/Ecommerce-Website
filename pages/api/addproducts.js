import { connectDB,disconnectDB } from "@/middleware/db";
import Product from "@/models/Product";

export default async function handler(req,res){
    if(req.method === "POST"){
        try{
            await connectDB();
            const product = new Product(req.body);
            await product.save();

            res.status(200).json({success:true})
            

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