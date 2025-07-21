const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@flixconvert.com' });
    
    if (existingAdmin) {
      console.log('Admin already exists!');
      console.log('Email: admin@flixconvert.com');
      console.log('Password: admin123');
      process.exit(0);
    }

    // Create new admin
    const admin = new Admin({
      name: 'Super Admin',
      email: 'admin@flixconvert.com',
      password: 'admin123',
      role: 'super_admin',
      isActive: true
    });

    await admin.save();
    
    console.log('✅ Admin account created successfully!');
    console.log('📧 Email: admin@flixconvert.com');
    console.log('🔑 Password: admin123');
    console.log('🌐 Login URL: http://localhost:3000/admin/login');
    
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

createAdmin(); 