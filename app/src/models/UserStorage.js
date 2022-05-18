//유저 정보를 가지고있음
"use strict";

class UserStorage{
    static #users = {//static선언하면 클래스자체에서 변수접근가능
        //#는 은닉화임(public -> private)
        id: ["SoNB", "SoNB1", "SoNB2"],
        psword: ["123", "1234", "12345"],
        name: ["손정호","정호","호"],
    };

    static getUsers(...fields){//은닉화된 변수를 가져다쓰기위한 함수
        //매개변수로 몇개를 받아올지 모름(받아온것들만 출력)
        const users = this.#users;
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

    static getUserInfo(id){
        const users = this.#users;
        const idx = users.id.indexOf(id);//id가 SoNB라면 인덱스 = 0
        const usersKeys = Object.keys(users);// => [id, psword, name]
        const userInfo = usersKeys.reduce((newUser, info) =>{
            newUser[info] = users[info][idx];//0번 인덱스의 키값들 들어감
            return newUser;
        }, {});

        return userInfo;//SoNB,123,손정호(0번째 인덱스인것들만)
    }
}

module.exports = UserStorage;