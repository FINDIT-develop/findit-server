const mysql = require("mysql2/promise");
const { logger } = require("./winston");

// TODO: 본인의 DB 계정 입력
const pool = mysql.createPool({
    host: '3.36.170.76',
    user: 'findit-admin',
    port: "3306",
    password: 'vlselt12#',
    database: 'finditDB',
});

module.exports = {
    pool: pool,
};