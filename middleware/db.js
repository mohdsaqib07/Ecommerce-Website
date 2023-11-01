import { connect, connections, disconnect } from 'mongoose';

const connectDB = async () => {
  try {
    if (connections[0].readyState) {
      console.log('connection is already done ')
    } else {
      await connect(process.env.MONGODB_URI);
      console.log('MongoDB Connected');
    }

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    // Exit process with failure
  }
};
const disconnectDB = async () => {
  try {
    await disconnect();
    console.log('MongoDB Disconnected');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);

  }
};



export {connectDB,disconnectDB};
