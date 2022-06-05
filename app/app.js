"use strict";

//모듈
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
/*환경변수 관리
외부에 노출되어선 안되는것들을 환경변수로 감춤
어떤 OS든간에, 모두 동일하게 환경변수 사용가능*/
const app = express();
dotenv.config(); //환경변수 모듈 동작
//.env에 등록되어있는 변수들을 Node.js에서 접근할 수 있도록 process.env에 등록시켜줌

//라우팅
const home = require("./src/routes/home");

//웹세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/*bodyParser : URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될경우
제대로 인식되지 않는 문제 해결*/

app.use("/", home); //use -> 미들 웨어를 등록해주는 메서드.

module.exports = app;
//* : 일반 정보
//! : 중요한 주의사항
//? : 궁금한 사항
//TODO : 추가적으로 해야 할 일
