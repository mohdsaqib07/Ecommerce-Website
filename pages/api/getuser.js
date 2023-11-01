import { compare } from 'bcrypt';
import  { connectDB,disconnectDB } from '@/middleware/db'; // Import the connectDB function
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await connectDB();
  if (req.method === 'POST') {
    // Establish connection to the database
    try {
    let { email, password } = req.body;
    let success = true;

      let user = await User.findOne({ email: email }).exec();

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
      
      const payload = {
         user:{
          id:user._id,
         }
      };
      const expiresInSeconds = 2 * 24 * 60 * 60; // 2 days in seconds
      const token = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:expiresInSeconds});
      await disconnectDB();
      res.status(200).json({ token, success });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal Server Error', success: false });
    }
  } else {
    res.status(500).end();
  }
}
