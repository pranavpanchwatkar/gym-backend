import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./src/models/Admin.js";


dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const createAdmin = async () => {
  const password = await bcrypt.hash("admin123", 10);

  const admin = new Admin({
  name: "Super Admin",
  email: "admin@gym.com",
  password: "admin123",
});


  await admin.save();
  console.log("Admin Created");
  process.exit();
};

createAdmin();
