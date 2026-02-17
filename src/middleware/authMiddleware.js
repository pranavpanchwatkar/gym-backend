import jwt from 'jsonwebtoken';

const verify = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer '))
        return res.status(401).send('Access Denied');

    const token = authHeader.split(' ')[1];

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).send('Invalid Token');
    }
};

const isAdmin = (req, res, next) => {
    if (req.user) next();
    else return res.status(403).send('Admins Only');
};

export default verify;
export { isAdmin };
