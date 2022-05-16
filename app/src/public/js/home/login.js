//front를위한 JS
"use strict";

//javascript에서 html에 존재하는 데이터들을 가져와서 제어
const id = document.querySelector("#id"),//선택자(ejs안에서 id값들)
psword = document.querySelector("#psword"),//#은 내가 지정한 태그라는 뜻
loginBtn = document.querySelector("button");//버튼은 태그 그대로를 가져옴(input은 두개인데,btn은 한개라서)

loginBtn.addEventListener("click", login);

function login() {
    const req = { //요청 데이터
        id : id.value,
        psword : psword.value,
    }

    fetch("/login", {//post api를 백엔드에서 가져다쓴거임
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req) //JSON형태로 전달(stringify는 req를 일반문자열로 바꿔줌)
    });//서버에 데이터 전달
}