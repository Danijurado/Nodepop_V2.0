class ChangeLocaleController {
    changeLocale(req, res, next) {
        const locale = req.params.locale;
        res.cookie('nodepop-locale', locale, {
            maxAge: 1000 * 60 * 60 * 24* 30 // 30 dias
    
        })
        res.redirect(req.get('Referer'));
    }
}

module.exports = ChangeLocaleController;