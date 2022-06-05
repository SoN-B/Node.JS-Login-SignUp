"use strict";

const logger = require("../../config/logger");
const User = require("../../models/User");

const output = {
    hello : (req, res) => {
        logger.info(`GET / 200 "홈 화면으로 이동"`);
        res.render("home/index.ejs");
    },
    login : (req, res) => {
        logger.info(`GET /login 200 "로그인 화면으로 이동"`);
        res.render("home/login.ejs");
    },
    register: (req, res) => {
        logger.info(`GET /register 200 "회원가입 화면으로 이동"`);
        res.render("home/register.ejs");
    },
};

const process = {
    login: async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();//User.js안에있는 함수
        //로그인 함수를 실행하는데도, 오래걸리기때문에 여기서도 await
        if(response.err)
            logger.error(
                `POST /login 200 Response: "success: ${response.success}, msg: ${response.err}"`
                );
        else
            logger.info(
                `POST /login 200 Response: "success: ${response.success}, msg: ${response.msg}"`
                );
        return res.json(response);//클라이언트에게 던져줌
    },
    register: async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();
        if(response.err)
            logger.error(
                `POST /login 200 Response: "success: ${response.success}, msg: ${response.err}"`
                );
        else
            logger.info(
                `POST /register 200 Response: "success: ${response.success}, msg: ${response.msg}"`
                );
        return res.json(response);
    }
};

module.exports = {
    output,
    process,
};