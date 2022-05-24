//유저 정보를 가지고있음
"use strict";

const fs = require("fs").promises;//fs가 promise를 반환하도록

class UserStorage{
    static #getUserInfo(data, id){//private한건 항상 최상단에
        const users = JSON.parse(data);

        const idx = users.id.indexOf(id);//id가 SoNB라면 인덱스 = 0
        const usersKeys = Object.keys(users);// => [id, psword, name]
        const userInfo = usersKeys.reduce((newUser, info) =>{
            newUser[info] = users[info][idx];//0번 인덱스의 키값들 들어감
            return newUser;
        }, {});

        return userInfo;//SoNB,123,손정호(0번째 인덱스인것들만)
        //단순히 콜백함수 안에서의 리턴
    }
    static #getUsers(data, isAll, fields){
        const users = JSON.parse(data);//JSON파일을 읽을 수 있도록
        if(isAll) return users;

        const newUsers = fields.reduce((newUsers, field) => {
            //fields의 요소들을 reduce로 순회시켜 newUsers로 생성시킴
            //newUsers에는 fields라는 배열의 초기값이 들어감
            if(users.hasOwnProperty(field)){//users에 해당키값이 있나?
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});//newUsers의 초기값을 내맘대로 {}빈 오브젝트로 생성

        return newUsers;
    }
    // static #users = {//static선언하면 클래스자체에서 변수접근가능
    //     //#는 은닉화임(public -> private)
    //     id: ["SoNB", "SoNB1", "SoNB2"],
    //     psword: ["123", "1234", "12345"],
    //     name: ["손정호","정호","호"],
    // };
    static getUsers(isAll, ...fields){//은닉화된 변수를 가져다쓰기위한 함수
        //매개변수로 몇개를 받아올지 모름(받아온것들만 출력)
        return fs.readFile("./src/databases/users.json")//프로미스 반환, 
        //getUserInfo안에서의 return하는게 있어야해서 여기에 return 적음
        .then((data) => {
            return this.#getUsers(data, isAll, fields);
        })
        .catch(console.error);//(err) => console.error(err)
    }

    static getUserInfo(id){
        return fs.readFile("./src/databases/users.json")//프로미스 반환, 
        //getUserInfo안에서의 return하는게 있어야해서 여기에 return 적음
        .then((data) => {
            return this.#getUserInfo(data, id);
        })
        .catch(console.error);//(err) => console.error(err)
    }

    static async save(userInfo) {
        // //const users = this.#users;
        // users.id.push(userInfo.id);
        // users.name.push(userInfo.name);
        // users.psword.push(userInfo.psword);
        // return {success : true};


        //json데이터베이스 파일 읽어오기 -> 그 파일에 데이터추가 -> 그다음 저장
        //const users = await this.getUsers("id", "psword", "name");
        //처음실행 : pending(데이터를 가져오지못함) -> 해결 : await
        const users = await this.getUsers(true);//true일시, 모든 파라미터 가져옴
        if(users.id.includes(userInfo.id)){ //클라이언트가 던져준 아이디가 서버에 있으면,
            throw "이미 존재하는 아이디입니다.";
        }
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.psword.push(userInfo.psword);
        
        fs.writeFile("./src/databases/users.json", JSON.stringify(users));//1.경로, 2.저장할 데이터
        //문자열 형태로 저장돼야 하기때문에 stringify
        return {success : true};
        //여기서 에러 핸들링을 해야하는데, User.js에 있음
    }
}

module.exports = UserStorage;