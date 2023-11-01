// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// http://localhost:3000/api/getblog?slug=how-to-learn-js
import Product from "@/models/Product";
import { connectDB,disconnectDB } from "@/middleware/db";


async function fetchData(category) {
 const data = await Product.find({category:category})

  // Transform the data to exclude _id or convert it to a string
  // const serializedData = data.map((item) => {
  //   // For example, converting _id to a string
  //   return { ...item, _id: item._id.toString() };
  // });

  return data;
}

export default async function handler(req, res) {
  try{
    const {category} = req.query;
    await connectDB();
    // const products = Product.find({category:category})
    let products = await fetchData(category);

    res.status(200).json({success:true,products:products});
    //  await disconnectDB();
  }
  catch(err){
    res.status(500).json({error:err.message});
  }


}
