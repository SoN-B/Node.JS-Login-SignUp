"use strict";

const users = {
    id: ["SoNB", "SoNB1", "SoNB2"],
    psword: ["123", "1234", "12345"],
};

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

        if(users.id.includes(id)){//front에서 전달한 id가 서버의 id에 있다면
            const idx = users.id.indexOf(id);
            if(users.psword[idx] === psword){
                return res.json({
                    success: true,
                });
            }
        }

        return res.json({
            success: false,
            msg: "로그인에 실패하셨습니다.",
        });
    },
};

module.exports = {
    output,
    process,
};