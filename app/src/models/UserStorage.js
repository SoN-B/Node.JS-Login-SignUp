//유저 정보를 가지고있음
"use strict";

const db = require("../config/db");

class UserStorage{
    static getUserInfo(id){
        return new Promise((resolve, reject) => {//그 객체를 return
            const query = "SELECT * FROM users WHERE id = ?;";
            db.query(query, [id], (err, data) => {
                //사용자로부터 받아온 id를 통해 query검색
                
                if(err) reject(`${err}`);
                else resolve(data[0]);//배열형태로 전달 되기 때문에 0번지전달
                //콜백함수의 return임(전체의 return이 X), 따라서 promise씀
            });
        });
    }

    static async save(userInfo) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO users(id, name, psword) VALUES(?, ?, ?);";
            db.query(query, [userInfo.id, userInfo.name, userInfo.psword], (err) => {
                //사용자로가 입력한 정보를 저장(따로 받을게 없기때문에 err만)
                
                if(err) reject(`${err}`);
                //err가 object객체이기 때문에, 문자열로 던질것임
                //경고창이 [object Object]나오는거 방지
                else resolve({ success : true });
            });
        });
    }
}
//Web Server : 클라이언트에게 요청이 왔을때, 서버에서는 아무처리없이 데이터전달만 해줌
//WAS : Web Server와는 다르게, 요청데이터를 가공해주고 전달시켜줌

module.exports = UserStorage;