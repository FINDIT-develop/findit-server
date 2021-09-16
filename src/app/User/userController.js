const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

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
     * Body: email, password, name, phone
     */
    const {
        email,
        password,
        name,
        password_check,
        phone,
    } = req.body;

    // 빈 값 체크
    if (!email)
        return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));
    if (!password) return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));
    if (!password_check)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_CHECK_EMPTY));
    if (!name) return res.send(response(baseResponse.SIGNUP_NICKNAME_EMPTY));

    // 길이 체크
    if (email.length > 30)
        return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));
    if (password.length < 6 || password.length > 12)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_LENGTH));
    if (password_check.length < 6 || password_check.length > 12)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_LENGTH));
    if (name.length < 2)
        return res.send(response(baseResponse.SIGNUP_NICKNAME_LENGTH));

    //비밀번호 일치 확인
    if (password !== password_check)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_NOT_MATCH));

    // 형식 체크 (by 정규표현식)
    if (!regexEmail.test(email))
        return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));

    var checkNumber = password.search(/[0-9]/g);
    var checkEnglish = password.search(/[a-z]/gi);

    if (checkNumber < 0 || checkEnglish < 0) {
        return res.send(response(baseResponse.SIGNUP_PASSWORD_ERROR_TYPE));
    }
    //번호 정규표현식 체크
    var regPhone = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
    if (!regPhone.test(phone))
        return res.send(response(baseResponse.SIGNUP_PHONE_ERROR_TYPE));



    const signUpResponse = await userService.createUser(
        email,
        password,
        name,
        phone
    );

    return res.send(signUpResponse);
};

/**
 * API No. 2
 * API Name : 유저 조회 API (+ 이메일로 검색 조회)
 * [GET] /app/users
 */
exports.getUsers = async function(req, res) {

    /**
     * Query String: email
     */
    const email = req.query.email;

    if (!email) {
        // 유저 전체 조회
        const userListResult = await userProvider.retrieveUserList();
        return res.send(response(baseResponse.SUCCESS, userListResult));
    } else {
        // 유저 검색 조회
        const userListByEmail = await userProvider.retrieveUserList(email);
        return res.send(response(baseResponse.SUCCESS, userListByEmail));
    }
};

/**
 * API No. 3
 * API Name : 특정 유저 조회 API
 * [GET] /app/users/{userId}
 */
exports.getUserById = async function(req, res) {

    /**
     * Path Variable: userId
     */
    const userId = req.params.userId;

    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const userByUserId = await userProvider.retrieveUser(userId);
    return res.send(response(baseResponse.SUCCESS, userByUserId));
};


// TODO: After 로그인 인증 방법 (JWT)
/**
 * API No. 4
 * API Name : 로그인 API
 * [POST] /app/login
 * body : email, passsword
 */
exports.login = async function(req, res) {

    const { email, password } = req.body;

    // TODO: email, password 형식적 Validation

    const signInResponse = await userService.postSignIn(email, password);

    return res.send(signInResponse);
};


/**
 * API No. 5
 * API Name : 회원 정보 수정 API + JWT + Validation
 * [PATCH] /app/users/:userId
 * path variable : userId
 * body : name
 */
exports.patchUsers = async function(req, res) {

    // jwt - userId, path variable :userId

    const userIdFromJWT = req.verifiedToken.userId

    const userId = req.params.userId;
    const name = req.body.name;

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!name) return res.send(errResponse(baseResponse.USER_name_EMPTY));

        const editUserInfo = await userService.editUser(userId, name)
        return res.send(editUserInfo);
    }
};

/**
 * API No. 자동로그인
 * [POST] /app/login/auto
 */
exports.autoLogin = async function(req, res) {
    const userIdFromJWT = req.verifiedToken.userId;

    const signInResponse = await userService.postAutoSignIn(userIdFromJWT);

    return res.send(signInResponse);
};




/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
exports.check = async function(req, res) {
    const userIdResult = req.verifiedToken.userId;
    console.log(userIdResult);
    return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};