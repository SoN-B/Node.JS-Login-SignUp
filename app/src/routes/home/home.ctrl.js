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
    login: async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();//User.js안에있는 함수
        //로그인 함수를 실행하는데도, 오래걸리기때문에 여기서도 await
        return res.json(response);//클라이언트에게 던져줌
    },
    register: async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();
        return res.json(response);
    }
};

module.exports = {
    output,
    process,
};