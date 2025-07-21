const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { auth } = require('../middleware/auth');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const router = express.Router();

// Initialize passport
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Find or create user
    let user = await User.findOne({ email: profile.emails[0].value });
    if (!user) {
      user = new User({
        name: profile.displayName,
        email: profile.emails[0].value,
        password: crypto.randomBytes(20).toString('hex'), // random password
      });
      await user.save();
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

// Google OAuth login start
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  prompt: 'select_account',
}));

// Google OAuth callback
router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/' }), async (req, res) => {
  // Generate JWT and redirect to frontend with token
  const user = req.user;
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  // Redirect to frontend with token as query param
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  res.redirect(`${frontendUrl}/login?token=${token}`);
});

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Create new user
    const user = new User({ name, email, password });
    await user.save();

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password, emailOrUsername } = req.body;

    // Accept either email+password or emailOrUsername+password
    const loginValue = emailOrUsername || email;
    if (!loginValue || !password) {
      return res.status(400).json({ error: 'Email/Username and password are required' });
    }

    // Find user by email or username (case-insensitive)
    const user = await User.findOne({
      $or: [
        { email: loginValue.toLowerCase() },
        { name: new RegExp(`^${loginValue}$`, 'i') }
      ]
    });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    }
  });
});

// Forgot Password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'Your email is incorrect or not registered. Please recheck your email.' });
    }
    // Generate token
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    // Send email (replace with your email config)
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${token}`;
    
    // Setup nodemailer with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });
    
    const mailOptions = {
      to: user.email,
      from: process.env.GMAIL_USER,
      subject: 'FlixConvert - Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #6c63ff; margin-bottom: 20px;">Password Reset Request</h2>
            <p style="color: #333; line-height: 1.6;">Hello ${user.name},</p>
            <p style="color: #333; line-height: 1.6;">You requested a password reset for your FlixConvert account.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background: #6c63ff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Reset Password</a>
            </div>
            <p style="color: #666; font-size: 14px; margin-top: 20px;">This link is valid for 1 hour. If you didn't request this, please ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="color: #999; font-size: 12px; text-align: center;">FlixConvert - File Compression Service</p>
          </div>
        </div>
      `
    };
    
    await transporter.sendMail(mailOptions);
    res.json({ message: 'A reset link has been sent to your email.' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) {
    return res.status(400).json({ error: 'Token and new password are required' });
  }
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }
    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();
    res.json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Change Password
router.post('/change-password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword, name } = req.body;
    const user = req.user;

    console.log('Change password request:', {
      userId: user._id,
      hasPassword: !!user.password,
      name: name,
      currentPasswordLength: currentPassword?.length,
      newPasswordLength: newPassword?.length
    });

    // Validation
    if (!newPassword || !name) {
      return res.status(400).json({ error: 'New password and name are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters long' });
    }

    // Check if user has a password (OAuth users might not have one)
    if (user.password) {
      // User has a password, so require current password verification
      if (!currentPassword) {
        return res.status(400).json({ error: 'Current password is required' });
      }

      // Verify current password
      try {
        console.log('Comparing password for user:', user._id);
        const isPasswordValid = await user.comparePassword(currentPassword);
        console.log('Password comparison result:', isPasswordValid);
        
        if (!isPasswordValid) {
          return res.status(400).json({ error: 'Current password is incorrect' });
        }
      } catch (error) {
        console.error('Password comparison error:', error);
        return res.status(400).json({ error: 'Current password is incorrect' });
      }
    } else {
      // OAuth user without password - allow setting password for first time
      console.log('OAuth user setting password for first time:', user._id);
    }

    // Update password and name
    user.password = newPassword;
    user.name = name;
    await user.save();

    res.json({ 
      message: 'Password and name updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 