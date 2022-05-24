//로그인, 회원가입 기능
"use strict";

const UserStorage = require("./UserStorage");

class User{
    constructor(body) {//생성자
        this.body = body;//클라이언트가 입력한것(id, psword)
    }

    login(){
        const client = this.body;
        const {id, psword} = UserStorage.getUserInfo(client.id);
        //id,psword,name 모두 불러올 수 있지만 로그인은 두개로도 충분
        //여기서 id, psword는 서버에서 가져온거임

        if(id){//내가 찾는 아이디가 서버에 있는지확인
            if(id === client.id && psword === client.psword){
                return { success: true };
            }
            return { success: false, msg: "비밀번호가 틀렸습니다."};
        }
        return { success: false, msg: "존재하지 않는 아이디입니다."};
    }
    register(){
        const client = this.body;
        const response = UserStorage.save(client);
        return response;
    }
}

module.exports = User;

