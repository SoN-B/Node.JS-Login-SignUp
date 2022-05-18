"use strict";

const UserStorage = require("../../models/UserStorage");

const output = {
    hello : (req, res) => {
        res.render("home/index.ejs");
    },
    login : (req, res) => {
        res.render("home/login.ejs");
    },
};

const process = {
    login: (req, res) => {
        const id = req.body.id,
        psword = req.body.psword;

        const users = UserStorage.getUsers("id", "psword");
        //id와 psword필드만 가져옴
        const response = {};//오브젝트 변수를 만듬
        if(users.id.includes(id)){//front에서 전달한 id가 서버의 id에 있다면
            const idx = users.id.indexOf(id);
            if(users.psword[idx] === psword){
                response.success = true;
                return res.json(response);
            }
        }

        response.success = false;
        response.msg = "로그인에 실패하셨습니다."
        return res.json(response);
    },
};

module.exports = {
    output,
    process,
};