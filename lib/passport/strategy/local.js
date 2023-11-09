const passport = require("passport-strategy"), util = require("util");

function Strategy(a, b) {
    a = a || {};
    this.name = "local";
    this._usernameField = a.usernameField || "login_username";
    this._passwordField = a.passwordField || "login_password";

    this._verify = b;
    this._passReqToCallback = a.passReqToCallback;
}

util.inherits(Strategy, passport.Strategy);

Strategy.prototype.authenticate = function (req, options) {
    options = options || {};
    var d = this,
        username = req.body[d._usernameField] || req.query[d._usernameField],
        password = req.body[d._passwordField] || req.query[d._passwordField];

    /** @param {Object | boolean} a error @param {Object | any} b user @param {Object | any} c info */
    function verified(a, b, c) { if (a) return d.error(a); if (!b) return d.fail(c); return d.success(b, c) }

    try {
        if (d._passReqToCallback) d._verify(req, username, password, verified);
        else d._verify(username, password, verified);
    } catch (a) { return d.error(a) }
};

module.exports = Strategy;
