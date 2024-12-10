require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const adminRoutes = require("./routes/adminRoutes");
const foodRoutes = require("./routes/foodRoutes");
const otpRoutes = require("./routes/otpRoutes");

const app = express();

// Middleware to handle CORS and JSON requests
app.use(cors({
    origin: '*', // Adjust this to specific domains in production for better security
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup file upload directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Add file extension
    },
});
const upload = multer({ storage }); // Initialize multer storage

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use("/admin", adminRoutes);
app.use("/food", foodRoutes);
app.use("/otp", otpRoutes);

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Default Route
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
