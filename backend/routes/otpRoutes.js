const express = require('express');
const router = express.Router();
// const { v4: uuidv4 } = require('uuid'); // For future session handling or IDs

// Replace otpCache with Redis for production
const otpCache = new Map();

// Admin mobile numbers (can also be stored in a database)
const adminNumbers = ['1234567890', '9876543210']; // Example admin numbers

// Generate OTP
router.post('/generate', (req, res) => {
    const { mobileNumber } = req.body;

    if (!mobileNumber || mobileNumber.length !== 10) {
        return res.status(400).json({ message: 'Invalid mobile number' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(otp);
    // Generate a 6-digit OTP
    otpCache.set(mobileNumber, otp);

    // Simulate sending OTP (In production, integrate SMS API here)
    console.log(`OTP for ${mobileNumber}: ${otp}`);
    res.status(200).json({ message: 'OTP sent successfully' });
});

// Validate OTP and Determine Role
router.post('/validate', (req, res) => {
    const { mobileNumber, otp } = req.body;

    if (!mobileNumber || !otp) {
        return res.status(400).json({ message: 'Mobile number and OTP are required' });
    }

    const storedOtp = otpCache.get(mobileNumber);

    if (storedOtp === otp) {
        otpCache.delete(mobileNumber); // Clear OTP after successful validation

        // Determine role
        const role = adminNumbers.includes(mobileNumber) ? 'admin' : 'user';
        res.status(200).json({
            message: 'OTP validated successfully',
            role: 'admin', // 'admin' or 'user'
        });
    } else {
        res.status(400).json({ message: 'Invalid OTP' });
    }
});

module.exports = router;
