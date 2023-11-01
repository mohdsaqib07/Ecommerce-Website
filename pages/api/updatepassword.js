import { compare,genSalt,hash } from 'bcrypt';
import  { connectDB,disconnectDB } from '@/middleware/db'; // Import the connectDB function
import User from '@/models/User';
import jwt from 'jsonwebtoken';
async function middleware(token) {
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

  if (req.method === 'POST') {
      await connectDB();
    // Establish connection to the database
    try {
    const cuser = await middleware(req.headers.authtoken);

    let { password, npassword } = req.body;
    let success = true;

      let user = await User.findById(cuser.id)
      console.log('old user ',user)
      if (!user) {
        success = false;
        await disconnectDB();
        return res.status(400).json({ status: 'Invalid credentials', success });
    }
    
    const passwordcompare = await compare(password, user.password);
     if(!passwordcompare) {
        
        success = false;
        await disconnectDB();
        return res.status(400).json({ status: 'Invalid credentials', success });
      }
       const salt = await genSalt(10);
       const hashedPassword = await hash(npassword, salt);
       user = await User.findOneAndUpdate({_id:cuser.id},{$set:{password:hashedPassword}},{new:true})
       console.log('new user',user)
       res.status(200).json({ success:true,status:"Your Password Has been Updated" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal Server Error', success: false });
    }
  } else {
    res.status(405).end();
  }
}
