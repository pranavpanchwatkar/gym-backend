import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


// ================= REGISTER =================
// @route   POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check existing admin
    const emailExist = await Admin.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save admin
    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      role: "admin"   // ⭐ important
    });

    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      adminId: admin._id
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


// ================= LOGIN =================
// @route   POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Email not found' });
    }

    // Compare password
    const validPass = await bcrypt.compare(password, admin.password);
    if (!validPass) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Create JWT Token
    const token = jwt.sign(
      { _id: admin._id, role: "admin" },   // ⭐ VERY IMPORTANT
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: "admin"
      }
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
