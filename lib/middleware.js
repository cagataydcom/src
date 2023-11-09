module.exports = class Middleware {
    constructor(...arg) { this.options = arg; return }; options = [];
    allowMethod = (...arg) => this.options[0].find(_ => _ === arg[0].method) ? arg[2]() : src.response(arg[0], 405);
    permission = (a, b, c) => { let a401 = () => src.response(a, 401); if (!a.headers?.authorization || a.headers?.authorization == "" || a.headers?.authorization == " ") return a401(); let d = src.srcData("middleware/permission"), e = a.headers?.authorization.split(" "); if (e.length !== 2) return a401(); else if (!d[e[1]] || e[0].toLowerCase() !== "bearer") return a401(); else if (d[e[1]].level < (this.options[0] || 10)) return a401(); else c() };
}