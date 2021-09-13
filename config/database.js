const mysql = require('mysql'); // mysql 모듈 로드
const conn = { // mysql 접속 설정
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
};

// config/database.js
module.exports = conn;