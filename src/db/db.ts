import mongoose from "mongoose";
/**
 * Connects to the MongoDB database
 *
 * @param retries number of retries
 * @param delay delay in milliseconds
 */
export const connectDB = async (retries = 5, delay = 10000) => {
  while (retries) {
    try {
      //TODO: Replace the connection string with an environment variable.
      const conn = await mongoose.connect(
       process.env.MONGO_URI!
      );
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      break;
    } catch (error: any) {
      console.log(`Error: ${error.message}`);
      retries -= 1;
      console.log(`Retries left: ${retries}`);
      if (retries === 0) {
        console.log("No more retries left. Exiting...");
        process.exit(1);
      }
      console.log(`Retrying in ${delay / 1000} seconds...`);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
};
