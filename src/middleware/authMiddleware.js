import jwt from 'jsonwebtoken';

const verify = (req, res, next) => {

    let token;

    // Standard Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    // If no token
    if (!token) {
        return res.status(401).send('Access Denied: No Token Provided');
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }
};

const isAdmin = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(403).send('Access Denied: Admins Only');
    }
};

export default verify;
export { isAdmin };
