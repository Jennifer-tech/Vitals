const { verifyToken, decodeToken } = require('../utils/jwtUtil')

exports.isAuth = async (req, res, next) => {
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
            return res.status(403).json({message: 'Invalid token, Unautorized user'})
        }

        token = req.headers.authorization.split(' ')[1]

        const { expired } = verifyToken(token);

        if(expired){
            return res.status(403).json({ message: 'Expired token, Unauthorized user'})
        }
        
        req.user = decodeToken(token)

        next();

    } catch (error) {
        return res.status(403).json({
            success: false,
            message: error
        })
    }
};