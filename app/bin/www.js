"use strict";

const app = require("../app.js");

const PORT = process.env.PORT || 3000;
//PORT라는 환경변수가 없을시, 뒤에 3000이 들어감 
//or연산 = 앞에것이 존재할시, true가 돼 그값이 들어감

app.listen(PORT, () => {
    console.log("서버 가동");
});