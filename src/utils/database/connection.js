import { mongoose } from "mongoose";
import PASSWORD_BD from "../vars.js";

async function connectToDatabase() {
  try {
    const connection = await mongoose.connect(
      `mongodb+srv://backend:${PASSWORD_BD}@cluster0.loabi.mongodb.net/project1?retryWrites=true&w=majority`
    );
    console.log("Connected to database");
    return connection;
  } catch (error) {
    console.log("Error connecting to database:");
    console.log(error);
    return null;
  }
}

export default connectToDatabase;
