//front를위한 JS
"use strict";

//javascript에서 html에 존재하는 데이터들을 가져와서 제어
const id = document.querySelector("#id"),//선택자(ejs안에서 id값들)
name = document.querySelector("#name"),
psword = document.querySelector("#psword"),//#은 내가 지정한 태그라는 뜻
confirmPsword = document.querySelector("#confirm-psword"),
registerBtn = document.querySelector("#button");

registerBtn.addEventListener("click", register);

function register() {
    if(!id.value) return alert("아이디를 입력해주세요.");
    if(psword.value !== confirmPsword.value) return alert("비밀번호가 일치하지 않습니다.");


    const req = { //요청 데이터
        id : id.value,
        name : name.value,
        psword : psword.value,
    };

    fetch("/register", {//post api를 백엔드에서 가져다쓴거임
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
            location.href = "/login"; //루트경로 이동(홈화면)
        } else {//실패하면 msg전달 받은거 띄움
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.error(new Error("회원가입 중 에러 발생"));
    })
}