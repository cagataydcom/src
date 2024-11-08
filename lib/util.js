module.exports = class Util {
    data = require("@cagatayd/data");
    random = (a = 6, b = 1, f = "-") => { let c = "abcdefghijklmnopqrstuvwxyz0123456789".split(""), d = "", e = [0, 0]; do { e[1] = 0; do { d = d + c[Math.floor(Math.random() * c.length)][Math.random() > 0.5 ? "toUpperCase" : "toLowerCase"](); e[1] = e[1] + 1; } while (e[1] < a); d = d + f; e[0] = e[0] + 1; } while (e[0] <= b); if (d.endsWith(f)) d = d.substring(0, d.length - 1); return d }
    __lang = (flag = "tr", key = "") => { let file = this.data(`language/${flag}`); return file[key] || key }
    lang = (a, b = 0, c = "tr") => { a = this.__lang(c, a); if (Array.isArray(b)) for (let i = 0; i < b.length; i++) { a = a.replace("{{" + i + "}}", b[i]); } else a = a.replace("{{0}}", b); return a };
    log = (a, d, e, b = "default", c = "log") => console[(c === "high" ? "log" : c)](`\u001b[4${c === "error" ? 1 : c === "warn" ? 3 : c === "high" ? 5 : 0}m\u001b[49m • [ ${new Date().getTime()} ] • [ ${this.lang("platform." + b)} ]> \u001b[37m${this.lang(a, d)}\u001b[39m`);
    response = (...arg) => { let a = this.data("express/response.json"), b = { code: -1, data: null, errors: [], message: "" }, c = (_ = "default") => a.saved[_] || a.saved["typed_wrong"], d = (_) => { _ = c(_); b = { ...b, code: _?.code, message: _?.text, status: _?.status }; return b }; switch (typeof arg[1]) { case "number": b = { ...b, status: arg[1] }; break; case "string": d(arg[1]); break; case "object": b = { ...b, ...arg[1] }; if (arg[1]?.id) d(arg[1].id); if (arg[1].errors) { let e = _ => { if (!Array.isArray(b.errors)) b.errors = []; if (typeof _ === "string") b.errors.push({ id: String(_).toUpperCase(), message: c(_).text }); else if (typeof _ === "object") b.errors.push(_); return; }; if (Array.isArray(arg[1].errors)) { b.errors = []; for (let i = 0; i < arg[1].errors.length; i++) { e(arg[1].errors[i]) } } else if (typeof arg[1].errors === "string") e(arg[1].errors) }; break; default: d(); break }; let f = typeof b?.status === "number" ? b.status : 200; b.status = {}; b.status[f] = a.status[f]; return arg[0].res.status(f).json(b) };
    options = this.data("system/config.json");
    page_options = (a = "default", b = this.data("express/page/options.json"), c = {}, d = { protocol: "https://" }) => {
        c = { opt: { ...b.public["default"], ...b.public[a] }, page: a, noAttachments: false, language: b.language }; d = { ...b.private, ...d }; if (this.options.devMode) { d.main = d.main.replace(".com", "com") + ".localhost"; d.protocol = "http://" }; Object.entries(d).forEach(e => {
            switch (e[0]) {
                case "protocol": break; case "main": c.main = d.protocol + d.main; break; case "ws": c.ws = d.protocol + (this.options.devMode ? "localhost:80" : d.main + ":2083"); break; default: c[e[0]] = d.protocol + e[1] + "." + d.main; break
            }
        }); return c
    }
    hostConfig = (dirname) => { dirname = dirname.replaceAll("\\", "/"); dirname = dirname.split("/web/hosts/"); dirname[1] = dirname[1].split("/")[0]; delete require.cache[require.resolve(dirname.join("/web/hosts/") + "/config.json")]; return require(dirname.join("/web/hosts/") + "/config.json") };
    render = (a, b = "default", c = {}) => {
        let page_options = this.page_options(b);
        if (page_options.language.list.find(d => String(a.query?.hl).toLowerCase() === d)) page_options.language.rn = String(a.query.hl).toLowerCase();
        let lang = this.data("express/page/language/" + page_options.language.rn + ".json");
        return a.res.render("index.ejs", { ...page_options, ...c, lang, signed_in: (a?.user || a?.isAuthenticated()), user: ((a?.user || a?.isAuthenticated()) ? a?.user : {}) });
    }
}