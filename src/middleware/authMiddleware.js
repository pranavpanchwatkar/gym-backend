import jwt from 'jsonwebtoken';

const verify = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

const isAdmin = (req, res, next) => {
    // Since we only have Admin model now, if user is authenticated, they are admin
    if (req.user) {
        next();
    } else {
        return res.status(403).send('Access Denied: Admins Only');
    }
};

export default verify;
export { isAdmin };
