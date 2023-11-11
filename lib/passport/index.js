const strategy = _ => require("./strategy/" + _);
module.exports = { auth: strategy("auth"), local: strategy("local") }