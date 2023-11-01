import { genSalt, hash } from 'bcrypt';
import  { connectDB,disconnectDB } from '@/middleware/db'; // Import the connectDB function
import User from '@/models/User';
import jwt from 'jsonwebtoken';


export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectDB();
    // Establish connection to the database
    try {
    // await connectDB();

    let { fname, lname, email, password } = req.body;
    let success = true;

      let user = await User.findOne({ email: email }).exec();

      if (user) {
        success = false;
        await disconnectDB();
        return res.status(400).json({ status: 'User with this email already exists try to login instead !', success });
      }

      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);
      const newUser = new User({ fname, lname, email, password: hashedPassword });
      await newUser.save();

      const payload = {
        user:{
         id:newUser._id,
        }
     };
      const expiresInSeconds = 2 * 24 * 60 * 60; // 2 days in seconds
      const token = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:expiresInSeconds});
      await disconnectDB();
      res.status(200).json({ token, success });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ status: 'Internal Server Error', success: false });
    }
  } else {
    await disconnectDB();
    res.status(500).json({ status: 'Internal Server Error', success: false });
  }
}
