
import { connectDB,disconnectDB } from "@/middleware/db"
import Product from "@/models/Product"

export default async function handler(req,res){
	if(req.method === 'POST'){
     const {id} = req.query;
     await connectDB();
     const product = await Product.findOne({_id:id})
     console.log(product)
     res.status(200).json({success:true,product})
	}
	else{
		res.status(405).end();
	}
}