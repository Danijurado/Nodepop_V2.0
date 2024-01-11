const User = require('../models/User');
var createError = require("http-errors");

class PrivadoController {
    async index(req, res, next) {
        try {
            const userId = req.session.usuarioLogado;
            
            const user = await User.findById(userId);
            
            if(!user) {
                next(createError(500, 'usuario not found'))
                return;
            }
            res.render('privado', {email: user.email});
        } catch (error) {
            next(error)
        }


    }
}

module.exports = PrivadoController;