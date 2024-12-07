require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const adminRoutes = require("./routes/adminRoutes");
const foodRoutes = require("./routes/foodRoutes");
//const otpRoutes = require("./routes/otpRoutes");

const app = express();

// Middleware to handle CORS and JSON requests
app.use(cors({
    origin: '*', // Allows all domains, adjust if needed
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup file upload directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Add extension
    },
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

app.use("/admin",adminRoutes);
app.use("/food",foodRoutes);
//app.use("/otp",otpRoutes);

// Serve uploaded images
app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static('uploads'));

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
