
import { connectDB,disconnectDB } from "@/middleware/db"
import Product from "@/models/Product"


export default async function handler(req,res){
	if(req.method === 'POST'){
     const {id} = req.query;
     const {data} = req.body;

     await connectDB();
     const product = await Product.findByIdAndUpdate(id,data,{new:true})

     res.status(200).json({success:true})
	}
	else{
		res.status(405).end();
	}
}