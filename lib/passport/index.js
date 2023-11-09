const strategy = _ => require("./strategy/" + _);
module.exports = { cagataydcom: strategy("auth"), local: strategy("local") }