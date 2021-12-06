const baseResponseStatus = require("../../../config/baseResponseStatus");
const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const productDao = require("./productDao");

// Provider: Read 비즈니스 로직 처리
exports.retrieveProduct = async function() {
    const connection = await pool.getConnection(async(conn) => conn);
    const ProductResult = await productDao.selectProduct(connection);

    connection.release();

    return ProductResult;
};