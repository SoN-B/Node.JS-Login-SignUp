const fs = require("fs");
const appRoot = require("app-root-path");
//루트경로를 가져와줌

const accessLogStream = fs.createWriteStream(
    `${appRoot}/log/access.log`, 
    //이 경로에 log파일 생성됨
    { flags: 'a' }
);

module.exports = accessLogStream;