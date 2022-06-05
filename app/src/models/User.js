//로그인, 회원가입 기능
"use strict";

const UserStorage = require("./UserStorage");

class User{
    constructor(body) {//생성자
        this.body = body;//클라이언트가 입력한것(id, psword)
    }

    async login(){//비동기 함수로 바꿔줌
        const client = this.body;
        try {
            const user = await UserStorage.getUserInfo(client.id);
            //await은 항상 프로미스를 반환하는 애한테만 가능
            //console.log가 먼저 찍힐 수 있어서 데이터 불러올 수 있는 시간이 필요함(await)
            //id,psword,name 모두 불러올 수 있지만 로그인은 두개로도 충분
            //여기서 id, psword는 서버에서 가져온게 저장돼있음
            //해당데이터를 전부 받아올때까지 기다려
            if(user){//내가 찾는 아이디가 서버에 있는지확인
                if(user.id === client.id && user.psword === client.psword){
                    return { success: true, msg: "로그인 성공!" };
                }
                return { success: false, msg: "비밀번호가 틀렸습니다."};
            }
            return { success: false, msg: "존재하지 않는 아이디입니다."};
        } catch (err) {
            return { success : false, err };
            //key와 value가 같으면 key만 입력해도됨
        }
    }

    async register(){
        const client = this.body;
        try{
        const response = await UserStorage.save(client);
        //clint정보가 Userstorage에 저장하는데 오래 걸리기때문에 await
        return response;
        } catch (err) {//throw
            return {success: false, err};
            //여기서 err는 오브젝트이기에, 문자열로 콘솔창에 출력하고 싶다면
            //throw Error -> throw로 변경해야함(UserStorage.js)
        }
    }
}

module.exports = User;
/*
*함수는 한가지 기능만 수행하도록 구현해줘야함.
*클래스는 User와 Userstorage처럼 각자의 역할을 분명하게 구분시켜주는 것이 좋음.
*UserStorage에서는 DB를 CRUD하는 역할만 수행하고, 해당데이터를 가지고 검증&조작하는 것은
*User가 수행하도록 역할을 구분해주는 것이죠.
*/
