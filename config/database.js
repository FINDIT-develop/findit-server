const mysql = require("mysql2/promise");
const { logger } = require("./winston");

// TODO: 본인의 DB 계정 입력
const pool = mysql.createPool({
    host: 'findit-rds.cfb8qbs4q57y.us-east-2.rds.amazonaws.com',
    user: 'admin',
    port: "3306",
    password: 'findit12#',
    database: 'findit',
});

module.exports = {
    pool: pool,
};