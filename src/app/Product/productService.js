const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
const secret_config = require("../../../config/secret");
const productProvider = require("./productProvider");
const productDao = require("./productDao");
const baseResponse = require("../../../config/baseResponseStatus");
const { response } = require("../../../config/response");
const { errResponse } = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { connect } = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.postLike = async function(userId, productId) {
    try {
        // //userId 확인
        // const userRows = await userProvider.retrieveUser(userId);
        // if (userRows.length < 1) return errResponse(baseResponse.USER_NOT_EXIST);

        // //eventId확인
        // const productRows = await productProvider.retrieveEventById(productId);
        // if (!productRows) return errResponse(baseResponse.PRODUCT_NOT_EXIST);

        //like 테이블 확인
        const likeRows = await productProvider.retrieveLike(
            userId,
            productId
        );

        if (likeRows[0].length < 1) {
            //insert
            // 등록
            const connection = await pool.getConnection(async(conn) => conn);
            const likeResult = await productDao.insertLike(
                connection,
                userId,
                productId
            );
            connection.release();
            return response(baseResponse.SUCCESS, {
                isSet: 1,
            });
        } else {
            // update
            // 해제
            const connection = await pool.getConnection(async(conn) => conn);
            const likeResult = await productDao.deleteLike(
                connection,
                userId,
                productId
            );
            connection.release();
            return response(baseResponse.SUCCESS, {
                isSet: 0,
            });
        }
    } catch (err) {
        logger.error(`App - updateLikeStatus Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}