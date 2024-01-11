const User = require('../models/User');

class LoginController {
    index(req, res, next) {
        res.locals.error = ''
        res.locals.email = ''
        res.render('login');
    }

    async post(req, res, next) {
        try {
            const {email, password} = req.body;
    
            //buscar usuario base de datos
            const user = await User.findOne({email: email});

            //si no encuentro o la password no coincide => error
            if (!user || !(await user.comparePassword(password))) {
                res.locals.error = req.__('Invalid credentials');
                res.locals.email = email;
                res.render('login');
                return;
            }
            //existe la password coincide 
            // apuntar en la sesion que el usuario esta autenticado
            req.session.usuarioLogado = user._id;
            res.redirect('/privado');

        } catch (error) {
            next(error);
        }
    }
}

module.exports = LoginController;