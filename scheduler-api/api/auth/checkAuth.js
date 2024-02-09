const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // if jwt verify fails
    try {
        // extract token from the authorization property of the headers
        // check against the private key
        const decoded = jwt.verify(req.headers.authorization.split(' ')[1], `${process.env.JWT_KEY}`);
        req.userData = decoded;

        // forward control to next middleware
        next();
    } catch(err) {
        return res.status(401).json({ message: 'auth failed' });
    }
}