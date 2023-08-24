import mongoose from 'mongoose';

const connectDB = async () => {
  if (process.env.MONGODB_URI !== undefined) {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(`Error: ${error} `);
    }
  }
};

export default connectDB;
