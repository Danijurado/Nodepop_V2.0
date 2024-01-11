//modulo que exporta un middleware que controla el login

module.exports = (req, res, next) => {
    if (!req.session.usuarioLogado) {
        res.redirect('/login');
        return;
    }
    next();
}