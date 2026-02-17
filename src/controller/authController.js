import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// ================= REGISTER =================
export const register = async (req, res) => {
    try {
        console.log("REGISTER BODY:", req.body);

        const emailExist = await Admin.findOne({ email: req.body.email });
        if (emailExist) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

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
        console.log("REGISTER ERROR:", err);
        res.status(500).json({ message: err.message });
    }
};


// ================= LOGIN =================
export const login = async (req, res) => {
    try {

        console.log("REQ BODY =>", req.body);

        const admin = await Admin.findOne({ email: req.body.email });
        console.log("ADMIN FROM DB =>", admin);

        if (!admin) {
            return res.status(400).json({ message: 'Email not found' });
        }

        const validPass = await bcrypt.compare(req.body.password, admin.password);
        console.log("PASSWORD MATCH =>", validPass);

        if (!validPass) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign(
            { _id: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        console.log("LOGIN SUCCESS");

        res.header('auth-token', token).json({
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
            }
        });

    } catch (err) {
        console.log("LOGIN ERROR =>", err);
        res.status(500).json({ message: err.message });
    }
};
