"use strict";

const app = require("../app.js");
const logger = require("../src/config/logger");

const PORT = process.env.PORT || 3000;
//PORT라는 환경변수가 없을시, 뒤에 3000이 들어감 
//or연산 = 앞에것이 존재할시, true가 돼 그값이 들어감

app.listen(PORT, () => {
    logger.info(`${PORT} 포트에서 서버가 가동되었습니다.`);
});