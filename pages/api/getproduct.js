// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectDB,disconnectDB } from "@/middleware/db"
import Product from "@/models/Product"

export default async function handler(req, res) {
    try{
       await connectDB();
       const {slug} = req.query 
       const product = await Product.findOne({slug:slug});
       console.log(product)
       if(product===null){
         return res.status(404).json({'success':false})
       }
       let variants = await Product.find({title:product.title,category:product.category})
       let colorSizeSlug = {} // {red:{xl:{slug:'item-xl'}}}
       for(let item of variants){
         if(item.color in colorSizeSlug){
            colorSizeSlug[item.color][item.size] = {slug:item.slug}
         }
         else{
            colorSizeSlug[item.color] = {}
            colorSizeSlug[item.color][item.size] = {slug:item.slug}
         }
       }
    //    await disconnectDB();
       res.status(200).json({'success':true,product,variants:JSON.parse(JSON.stringify(colorSizeSlug))})
    }
    catch(err){
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
          
  }
  