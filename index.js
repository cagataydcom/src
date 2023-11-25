const lib = _ => require("./lib/" + _);
const src = new class CagatayD extends require("./lib/util") {
    crypto = lib("crypto");
    Middleware = lib("middleware");
    schema = lib("schema");
    struct = lib("struct");

    db = async (query = { sql: null, values: [] }, values = []) => new Promise((r) => { let a = { error: null, data: null }; this.struct.mysql().getConnection((err, c) => { function fy(x, y) { function cb(_a, _b) { c.release(); return r({ error: _a, data: _b }) }; if (y.length > 0) c.query(x, y, cb); else c.query(x, cb) }; if (err) return r({ ...a, error: err }); if (typeof query === "string") return fy(query, values); else return fy(query.sql, query.values) }) });

    fetch = lib("fetch");
}

module.exports = src;