const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const secret_config = require("../../../config//secret");
const { response, errResponse } = require("../../../config/response");
const request = require("request");
const crypto = require("crypto");
const cache = require("memory-cache");
const jwt = require("jsonwebtoken");

const regexEmail = require("regex-email");
const { emit } = require("nodemon");

/**
 * API No. 0
 * API Name : 테스트 API
 * [GET] /app/test
 */
exports.getTest = async function(req, res) {

    return res.send(response(baseResponse.SUCCESS))
}

/**
 * API No. 1
 * API Name : 유저 생성 (회원가입) API
 * [POST] /app/users
 */
exports.postUsers = async function(req, res) {
    /**
     * Body: firebaseUID
     */
    const firebaseUID = req.body.firebaseUID;

    // 빈 값 체크
    if (!firebaseUID) return res.send(response(baseResponse.SIGNUP_UID_EMPTY));


    const signUpResponse = await userService.createUser(firebaseUID);

    return res.send(signUpResponse);
};