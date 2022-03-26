const jwt = require('jsonwebtoken');

function jwtAuth(req, res, next) {
    const { authorization } = req.headers;

    if(!authorization) {
        return res.status(401).json({
            message: "token doesn't exists",
        });
    }
    const token = authorization.split(' ')[1];

    try {
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if(tokenDecoded) {
            req.token = tokenDecoded;
            req.auth = true;
            next();
        } else {
            return res.status(401).json({ message: 'invalid-token', auth: false});
        }
    } catch (err) {
        return res.status(401).json({ message: 'invalid-token', auth: false});
    }
}

module.exports = jwtAuth;
