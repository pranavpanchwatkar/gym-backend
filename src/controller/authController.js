import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// @desc    Register a new admin
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
    try {
        // Check if user already exists
        const emailExist = await Admin.findOne({ email: req.body.email });
        if (emailExist) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new admin
        const admin = new Admin({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        const savedAdmin = await admin.save();
        res.status(201).json({
            message: 'Admin registered successfully',
            adminId: savedAdmin._id
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
    try {
        // Check if user exists
        const admin = await Admin.findOne({ email: req.body.email });
        if (!admin) {
            return res.status(400).json({ message: 'Email not found' });
        }

        // Check if password is correct
        const validPass = await bcrypt.compare(req.body.password, admin.password);
        if (!validPass) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Create and assign a token
        const token = jwt.sign(
            { _id: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.header('auth-token', token).json({
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
