//front를위한 JS
"use strict";

//javascript에서 html에 존재하는 데이터들을 가져와서 제어
const id = document.querySelector("#id"),//선택자(ejs안에서 id값들)
psword = document.querySelector("#psword"),//#은 내가 지정한 태그라는 뜻
//loginBtn = document.querySelector("button");//버튼은 태그 그대로를 가져옴(input은 두개인데,btn은 한개라서)
loginBtn = document.querySelector("#button");

loginBtn.addEventListener("click", login);

function login() {
    if(!id.value) return alert("아이디를 입력해주세요.");
    if(!psword.value) return alert("비밀번호를 입력해주세요.");

    const req = { //요청 데이터
        id : id.value,
        psword : psword.value,
    }

    fetch("/login", {//post api를 백엔드에서 가져다쓴거임
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req), //JSON형태로 전달(stringify는 req를 일반문자열로 바꿔줌)
        //서버에 데이터 전달
    })
    .then((res) => res.json()) //서버에 요청하고 그 응답을 받으려면 then씀
    //.then((res) => console.log(res)); -> 파라미터로 넘기는 값을 어떠한 함수안의
    //파라미터로 넘길때 더 간추려서 쓸 수 있음 -> .then(console.log);
    .then((res) => { //promise타입은 then메소드로 접근가능(그래서 한번 더씀)
        if(res.success) { //success키값이 true이면,
            location.href = "/"; //루트경로 이동(홈화면)
        } else {//실패하면 msg전달 받은거 띄움
            if (res.err) return alert(res.err);
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.error(new Error("로그인 중 에러 발생"));
    })
}

/*
*res.json()의 반환 값은 Promise다. 기본res의 반환 값은 Response 스트림인데,
*.json()메서드를 통해 Response(응답)스트림을 읽을 수 있다.
*Response는 데이터가 모두 받아진 상태가 아니다. 따라서 .json()으로 Response스트림을
*가져와 완료될 때까지 읽는다. 다 읽은 body의 텍스트를 Promise 형태로 반환한다.
*/