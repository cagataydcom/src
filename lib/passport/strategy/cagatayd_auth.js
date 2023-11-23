const _Strategy = require("passport-oauth2"), util = require("util");

function Strategy(opt, cb) {
    opt = opt || {};
    opt.domain = "http://auth.cagataydcom.localhost/"
    opt.authorizationURL = "http://auth.cagataydcom.localhost/authorize";
    opt.tokenURL = "http://127.0.0.1:31443/oauth2/token";
    opt.clientID = "xlbot";
    opt.clientSecret = "TDUChX147P9u5K8Fjs1Hx49O7MIY5U.oQTQZ6XlNQ13db3KfM2P823Gb3kmKA.uFl9YSoUM78jaUx1dJ9ewqSmKTsBAd";
    opt.callbackURL = "http://xlbot.cagataydcom.localhost/login";
    opt.scopeSeparator = " ";
    opt.scope = ["identify"];
    /*opt.state = true;
    opt.pkce = true;*/

    _Strategy.call(this, opt, cb);
    this.name = 'cagataydcom';
    this._oauth2.useAuthorizationHeaderforGET(true);
}

Strategy.prototype.userProfile = function (accessToken, done) {
    this._oauth2.get("http://127.0.0.1:31443/oauth2/@me", accessToken, function (err, body, res) {
        if (err) return done(null, { error: err });
        else try { var parsedData = JSON.parse(body); } catch (e) { return done(null, { error: true }); }

        var profile = parsedData.data;
        profile.provider = 'cagataydcom';
        profile.accessToken = accessToken;

        profile.fetchedAt = new Date();
        return done(null, profile)
    });
};

util.inherits(Strategy, _Strategy);

module.exports = Strategy;
