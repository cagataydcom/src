const dataPath = [__dirname + "../../../cagataydcom/lib/data/", "../../cagataydcom/lib/data/"];

module.exports = class Util {
    data = (file, fs = false) => (fs ? require("node:fs").readFileSync(dataPath[0] + file) : require(dataPath[1] + file));
    random = (a = 6, b = 1, f = "-") => { let c = "abcdefghijklmnopqrstuvwxyz0123456789".split(""), d = "", e = [0, 0]; do { e[1] = 0; do { d = d + c[Math.floor(Math.random() * c.length)][Math.random() > 0.5 ? "toUpperCase" : "toLowerCase"](); e[1] = e[1] + 1; } while (e[1] < a); d = d + f; e[0] = e[0] + 1; } while (e[0] <= b); if (d.endsWith(f)) d = d.substring(0, d.length - 1); return d }
    __lang = (flag = "tr", key = "") => { let file = this.data(`language/${flag}`); return file[key] || key }
    lang = (a, b = 0, c = "tr") => { a = this.__lang(c, a); if (Array.isArray(b)) for (let i = 0; i < b.length; i++) { a = a.replace("{{" + i + "}}", b[i]); } else a = a.replace("{{0}}", b); return a };
    log = (a, d, e, b = "default", c = "log") => console[(c === "high" ? "log" : c)](`\u001b[4${c === "error" ? 1 : c === "warn" ? 3 : c === "high" ? 5 : 0}m\u001b[49m • [ ${new Date().getTime()} ] • [ ${this.lang("platform." + b)} ]> \u001b[37m${this.lang(a, d)}\u001b[39m`);
    response = (...arg) => { let a = this.data("express/response.json"), b = { code: -1, data: null, errors: [], message: "" }, st = (_ = "default") => a.saved[_] || a.saved["typed_wrong"], mk = (_) => { _ = st(_); return b = { ...b, code: _.code, message: _.text, status: _.status } }; if (typeof arg[1] === "number") b = { ...b, status: arg[1] }; switch (typeof arg[1]) { case "number": b = { ...b, status: arg[1] }; break; case "string": mk(arg[1]); break; case "object": b = { ...b, ...arg[1] }; if (arg[1]?.id) mk(arg[1].id); if (typeof arg[1]?.status === "number") b = { ...b, ...arg[1], status: arg[1].status }; if (arg[1].errors) { let b = _ => { if (typeof _ === "string") b.errors.push({ id: String(_).toUpperCase(), message: st(_).text }); else if (typeof _ === "object") b.errors.push(_); }; if (Array.isArray(arg[1].errors)) { b.errors = []; for (let i = 0; i < arg[1].errors.length; i++) { b(arg[1].errors[i]) } } else if (typeof arg[1].errors === "string") b(arg[1].errors) }; break; case "undefined": mk(); break }; let code = typeof b?.status === "number" ? b.status : 200; b.status = {}; b.status[code] = a.status[code]; return arg[0].res.status(code).json(b) }
    options = this.data("system/config.json");
    page_options = (a = "default", b = this.data("express/page/options.json"), c = {}, d = { protocol: "https://" }) => { c = { opt: { ...b.public["default"], ...b.public[a] }, page: a, noAttachments: false, language: b.language }; d = { ...b.private, ...d }; if (this.options.devMode) { d.main = "localhost"; d.protocol = "http://" }; Object.entries(d).forEach(e => { switch (e[0]) { case "protocol": break; case "main": c.main = d.protocol + d.main; break; default: c[e[0]] = d.protocol + e[1] + "." + d.main; break } }); return c }

    render = (a, b = "default", c = {}) => {
        let page_options = this.page_options(b);
        if (typeof page_options.language.list[String(a.query?.hl).toLowerCase()] !== "undefined") page_options.language.rn = page_options.language.list[String(a.query.hl).toLowerCase()];
        let lang = this.data("express/page/language/" + page_options.language.rn + ".json");
        return a.res.render("index.ejs", { ...page_options, ...c, lang });
    }
}