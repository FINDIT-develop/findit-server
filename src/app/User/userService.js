const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
const secret_config = require("../../../config/secret");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponseStatus");
const { response } = require("../../../config/response");
const { errResponse } = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { connect } = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createUser = async function(firebaseUID) {

    const connection = await pool.getConnection(async(conn) => conn);

    const userIdResult = await userDao.insertUserInfo(connection, firebaseUID);
    console.log(`추가된 회원 : ${userIdResult[0].insertId}`)
    connection.release();
    return response(baseResponse.SUCCESS, { userId: userIdResult[0].insertId, });

};