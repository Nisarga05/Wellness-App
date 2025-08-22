const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const sessionRoutes = require("./routes/sessionRoutes");

const app = express();

// connect MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error("MongoDB connection error ❌", err));

// CORS
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5000"], 
  credentials: true, 
}));

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/', require('./routes/authRoutes'));
app.use("/", sessionRoutes);

// start server
const port = 5000;
app.listen(port, () =>
  console.log(`server is running at port ${port}`)
);
