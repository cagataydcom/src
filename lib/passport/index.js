const strategy = _ => require("./strategy/" + _);
module.exports = { cagatayd_auth: strategy("cagatayd_auth"), local: strategy("local") }