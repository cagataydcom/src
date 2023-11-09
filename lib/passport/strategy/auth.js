const _Strategy = require("passport-oauth2"), util = require("util");

function Strategy(opt, cb) {
    opt = opt || {};
    opt.domain = "auth.cagatayd.com/"
    opt.authorizationURL = "auth.cagatayd.com/authorize";
    opt.tokenURL = "http://127.0.0.1:31443/oauth2/token";
    opt.clientID = "xlbot";
    opt.clientSecret = "TDUChX147P9u5K8Fjs1Hx49O7MIY5U.oQTQZ6XlNQ13db3KfM2P823Gb3kmKA.uFl9YSoUM78jaUx1dJ9ewqSmKTsBAd";
    opt.callbackURL = "http://xlbot.localhost/user/login";
    opt.scopeSeparator = " ";
    opt.scope = ["identify"];
    opt.state = true;
    opt.pkce = true;

    _Strategy.call(this, opt, cb);
    this.name = 'cagataydcom';
    this._oauth2.useAuthorizationHeaderforGET(false);
}

util.inherits(Strategy, _Strategy);

module.exports = Strategy;
