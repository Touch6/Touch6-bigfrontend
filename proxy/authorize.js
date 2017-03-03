var DataProxy = require('./DataProxy').DataProxy;

exports.authorize = function (req, res, next) {
    console.log(req.session.user);
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        next();
    }
}

exports.model = function (req, res, next) {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        DataProxy.Interceptor(req, res, next);
    }
}
