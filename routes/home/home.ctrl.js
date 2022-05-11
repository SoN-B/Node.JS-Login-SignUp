"use strict";

const hello = (req, res) => {
    res.render("home/index.ejs");
};

const login = (req, res) => {
    res.render("home/login.ejs");
};

module.exports = {
    hello,
    login,
};