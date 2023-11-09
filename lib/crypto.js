module.exports = new class Crypto {
    module = require("bcrypt");
    hash = a => new Promise(async (b) => { let c = await this.module.hash(a, 12); return b(c) });
    compare = (a, b) => new Promise(async (c) => { let d = await this.module.compare(a, b); return c(d) });
}