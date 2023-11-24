const src = new (require("./util"));

module.exports = new class Struct {
    express = (...arg) => require("express")(arg);
    mysql = (config) => {
        if (typeof config !== "object") config = src.data("system/mysql.json");
        return require("mysql").createPool(config);
    }
}