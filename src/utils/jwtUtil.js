const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode')
require('dotenv').config()

// encode the jwt
const encode_jwt = function (obj) {
    const jwtToken = jwt.sign(obj,
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    return jwtToken;
}

// verify token
const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return {
            expired: false,
            decoded,
        }
    } catch(err){
        return{
            expired: err.message === 'JWT expired',
            decoded: null
        };
    }
}
// decde the token
const decodeToken = (token) => {
    const id = jwt_decode(token)._id
    return id
}

module.eports = { encode_jwt, verifyToken, decodeToken}