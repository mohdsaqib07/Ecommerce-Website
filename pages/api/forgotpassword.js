import  { connectDB,disconnectDB } from '@/middleware/db'; // Import the connectDB function
import User from '@/models/User';
import Forgot from '@/models/Forgot';
import jwt from 'jsonwebtoken';
import { hash,genSalt } from 'bcrypt';

export default async function handler(req,res){
	if(req.method === 'POST'){
		// check if the user exist in the database and if it exist send the mail to the user email
		await connectDB();
	    const {email,sendMail,password} = req.body;
	    if(sendMail){
	   
		let user = await User.findOne({ email: email }).exec(); 
		if (!user) {
        return res.status(400).json({ status: 'Invalid credentials', success:false });
        }


        let token = 'thiswillbearandomtoken'
     

        let forgot = new Forgot({
        	email:email,
        	token:token
        })

        let helpemail = `We have send this email in response to your request to  reset your password on Codeswear.com
        To reset your password , please follow the link below:
        <a href="http://localhost:3000/fpassword/?token=${token}">Reset password</a>
        <br/></br>
        We recommend that your keep your password secure and not share it with anyone . If your feel your password has
        been compromised, you can change it by going to your myaccount page and change your password.
        <br/></br>`
        res.status(200).json({success:true}) 
        }
        else{
      let user = await User.findOne({ email: email }).exec(); 
      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);
       user = await User.findOneAndUpdate({email:email},{$set:{password:hashedPassword}},{new:true})
       console.log('new user',user)
       res.status(200).json({ success:true,status:"Your Password Has been Updated" });
        }
	}
	else{
		res.status(405).end();
	}
}