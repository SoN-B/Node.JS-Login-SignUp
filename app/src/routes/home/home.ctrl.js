"use strict";

const User = require("../../models/User");

const output = {
    hello : (req, res) => {
        res.render("home/index.ejs");
    },
    login : (req, res) => {
        res.render("home/login.ejs");
    },
    register: (req, res) => {
        res.render("home/register.ejs");
    },
};

const process = {
    login: (req, res) => {
        const user = new User(req.body);
        const response = user.login();//User.js안에있는 함수
        return res.json(response);//클라이언트에게 던져줌
    },
};

module.exports = {
    output,
    process,
};