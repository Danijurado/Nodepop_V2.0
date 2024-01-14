var createError = require("http-errors");
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const tokenJWT = req.get('Authorization') || req.body.jwt || req.query.jwt;

        if(!tokenJWT) {
            next(createError(401, 'no token provided'))
            return;
        }
       
        jwt.verify(tokenJWT, process.env.JWT_SECRET, (error, payLoad) => {
            if (error) {
                
                next(createError(401, 'invalid token'));
                return;

            }
            req.usuarioLogadoAPI = payLoad._id;

            next();
        });

    } catch (error) {
       next(error); 
    }
}