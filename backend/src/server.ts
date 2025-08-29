import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 4000;
const MONGO = process.env.MONGO_URI || "";

async function start() {
  try {
    await mongoose.connect(MONGO);
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error("Failed to start", err);
    process.exit(1);
  }
}

start();
