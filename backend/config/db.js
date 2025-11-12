// backend/config/db.js
import { connect } from 'mongoose';
import { config } from 'dotenv';

config(); // Load environment variables

const connectDB = async () => {
  try {
    const conn = await connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Deprecated in Mongoose 6, but good for older versions
      useUnifiedTopology: true, // Deprecated in Mongoose 6, but good for older versions
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;