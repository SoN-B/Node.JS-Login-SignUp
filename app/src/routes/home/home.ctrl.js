"use strict";

const logger = require("../../config/logger");
const User = require("../../models/User");

const output = {
    hello : (req, res) => {
        logger.info(`GET / 304 "홈 화면으로 이동"`);
        res.render("home/index.ejs");
    },

    login : (req, res) => {
        logger.info(`GET /login 304 "로그인 화면으로 이동"`);
        res.render("home/login.ejs");
    },

    register: (req, res) => {
        logger.info(`GET /register 304 "회원가입 화면으로 이동"`);
        res.render("home/register.ejs");
    },
};

const process = {
    login: async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();//User.js안에있는 함수
        //로그인 함수를 실행하는데도, 오래걸리기때문에 여기서도 await
        const url = {
            method: "POST",
            path: "/login",
            status: response.err ? 400: 200,
            //서버에 에러가 있으면, 400아니면 200
        }
        
        log(response, url);
        return res.status(url.status).json(response);//클라이언트에게 던져줌
    },

    register: async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();

        const url = {
            method: "POST",
            path: "/register",
            status: response.err ? 400: 200,
        }
        
        log(response, url);
        return res.status(url.status).json(response);
    }
};

module.exports = {
    output,
    process,
};

const log = (response, url) => {
    if(response.err)
        logger.error(
            `${url.method} ${url.path} ${url.status} Response: ${response.success} ${response.err}"`
        );
    else
        logger.info(
            `${url.method} ${url.path} ${url.status} Response: ${response.success} ${response.msg || ""}"`
        );
}