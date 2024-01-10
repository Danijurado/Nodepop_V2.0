const auth = require('basic-auth');

module.exports = (req, res, next) => {
    const user = auth(req);

    if (!user || user.name !== 'admin' || user.pass !== '1111') {
        res.set('WWW-Authenticate', 'Basic realm=Authorization required');
        res.sendStatus(401);
        return
    }
    next();
}