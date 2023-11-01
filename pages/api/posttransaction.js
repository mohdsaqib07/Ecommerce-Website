
export default async function handler(req,res){
    // Insert into order table after checking the transaction status 
    // Initiate Shipping 
    // Redirect User to the order confirmation page 
    res.status(200).json({body:req.body});
}