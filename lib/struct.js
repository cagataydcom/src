const src = new (require("./util"));

module.exports = new class Struct {
    express = (app, options = { passport: false }) => {
        if (typeof app == "object") { options = app; app = require("express")(); }
        else if (typeof app !== "function") app = require("express")();

        let q = { a: require("body-parser"), b: require("cookie-parser"), c: require("express-session"), d: require("cors"), e: require("passport") };
        let session = src.data("express/session.json"), cors = src.data("express/cors.json"); session.secret = src.random(10, 10);
        if (src.options.devMode) { delete session.cookie; cors.origin = cors.origin.map(_ => _.replace("https", "http").replace("cagatayd.com", "localhost")) }
        app.set("x-powered-by", false).use(q.a.json()).use(q.a.urlencoded({ extended: true })).use(q.b()).use(q.c(session)).use(q.d(cors))

        if (options.passport) { q.e.serializeUser((a, b) => b(null, a)); q.e.deserializeUser((a, b) => b(null, a)); app.use(q.e.initialize()).use(q.e.session()) }
        return app;
    };
    mysql = (config) => {
        if (typeof config !== "object") config = src.data("system/mysql.json");
        return require("mysql").createPool(config);
    }
}