const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid'); // Or use any OTP generation logic

const otpCache = new Map(); // Replace with Redis for production

// Generate OTP
router.post('/generate', (req, res) => {
    const { mobileNumber } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpCache.set(mobileNumber, otp);

    // Simulate sending OTP
    
    console.log(`OTP for ${mobileNumber}: ${otp}`);
    res.status(200).json({ message: 'OTP sent successfully' });
});

// Validate OTP
router.post('/validate', (req, res) => {
    const { mobileNumber, otp } = req.body;
    const storedOtp = otpCache.get(mobileNumber);

    if (storedOtp === otp) {
        otpCache.delete(mobileNumber);
        res.status(200).json({ message: 'OTP validated successfully' });
    } else {
        res.status(400).json({ message: 'Invalid OTP' });
    }
});

module.exports = router;
