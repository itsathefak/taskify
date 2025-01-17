require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5001;

// DB Connection
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("MongoDB Connected Successfully...");
    } catch (err) {
      console.error("Error connecting to MongoDB:", err.message);
      process.exit(1);
    }
  };
  
  connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to Taskify API!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
