const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Farmer = require('../models/Farmer');

const JWT_SECRET = process.env.JWT_SECRET || 'kisanprocure_secret_key_sih2026_jwt_token_secure';

// In-memory OTP storage for demo/hackathon
const otpStore = new Map();

/**
 * POST /api/v1/auth/request-otp
 */
router.post('/request-otp', async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone || phone.length < 10) {
      return res.status(400).json({ success: false, message: 'Valid 10-digit mobile number required' });
    }

    // Fixed demo OTP or randomized
    const otp = phone === '9876543210' ? '1234' : Math.floor(1000 + Math.random() * 9000).toString();
    otpStore.set(phone, otp);

    console.log(`🔑 OTP for ${phone}: ${otp}`);

    return res.json({
      success: true,
      message: 'OTP sent successfully to registered mobile',
      demoOtp: otp, // Included for instant SIH judging
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * POST /api/v1/auth/verify-otp
 */
router.post('/verify-otp', async (req, res) => {
  try {
    const { phone, otp, role = 'farmer', name } = req.body;
    const storedOtp = otpStore.get(phone) || '1234'; // allow 1234 default fallback

    if (otp !== storedOtp && otp !== '1234') {
      return res.status(400).json({ success: false, message: 'Invalid OTP entered' });
    }

    let user = await User.findOne({ phone });
    if (!user) {
      user = await User.create({
        phone,
        role,
        preferredLanguage: 'mr',
      });

      if (role === 'farmer') {
        await Farmer.create({
          userId: user._id,
          name: name || 'आनंदराव पाटील (Anandrao Patil)',
          phone,
          village: 'पिंपळगाव (Pimpalgaon)',
          district: 'नाशिक (Nashik)',
          state: 'Maharashtra',
          landHoldingAcres: 4.5,
          bankDetails: {
            bankName: 'State Bank of India',
            accountNumber: '••••••••4821',
            ifscCode: 'SBIN0001234',
            accountHolderName: name || 'Anandrao Patil',
          },
        });
      }
    }

    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign(
      { id: user._id, phone: user.phone, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const farmer = await Farmer.findOne({ userId: user._id });

    return res.json({
      success: true,
      token,
      user: {
        id: user._id,
        phone: user.phone,
        role: user.role,
        preferredLanguage: user.preferredLanguage,
        farmer: farmer || null,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * POST /api/v1/auth/demo-login
 * Instant role switcher for SIH judges
 */
router.post('/demo-login', async (req, res) => {
  try {
    const { role = 'farmer' } = req.body;
    const demoPhones = {
      farmer: '9876543210',
      operator: '9876543211',
      manager: '9876543212',
      admin: '9876543213',
    };

    const phone = demoPhones[role] || '9876543210';
    let user = await User.findOne({ phone });

    if (!user) {
      user = await User.create({
        phone,
        role,
        preferredLanguage: 'mr',
      });

      if (role === 'farmer') {
        await Farmer.create({
          userId: user._id,
          name: 'आनंदराव पाटील (Anandrao Patil)',
          phone,
          village: 'पिंपळगाव (Pimpalgaon)',
          district: 'नाशिक (Nashik)',
          state: 'Maharashtra',
          landHoldingAcres: 4.5,
        });
      }
    }

    const token = jwt.sign(
      { id: user._id, phone: user.phone, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const farmer = await Farmer.findOne({ userId: user._id });

    return res.json({
      success: true,
      token,
      user: {
        id: user._id,
        phone: user.phone,
        role: user.role,
        preferredLanguage: user.preferredLanguage,
        farmer: farmer || null,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
