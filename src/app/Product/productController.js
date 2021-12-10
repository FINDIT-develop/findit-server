const jwtMiddleware = require("../../../config/jwtMiddleware");
const productProvider = require("../../app/Product/productProvider");
const productService = require("../../app/Product/productService");
const baseResponse = require("../../../config/baseResponseStatus");
const secret_config = require("../../../config//secret");
const { response, errResponse } = require("../../../config/response");
const request = require("request");
const crypto = require("crypto");
const cache = require("memory-cache");
const jwt = require("jsonwebtoken");


/**
 * API No. 제품 전체 조회 API
 * [POST] /app/products
 */
exports.getProducts = async function(req, res) {

    const category = req.query.category;

    if (category < 0 && category > 6)
        return res.send(response(baseResponse.CATEGORY_ERROR_TYPE));
    const productsResult = await productProvider.retrieveProduct(category);

    return res.send(response(baseResponse.SUCCESS, productsResult));
}

/**
 * API No. 제품 전체 조회 API
 * [POST] /app/products/:productId
 */
exports.getProductById = async function(req, res) {
    const productId = req.params.productId;

    if (!productId) return res.send(response(baseResponse.PRODUCT_ID_EMPTY));
    const productResult = await productProvider.retrieveProductById(productId);

    return res.send(response(baseResponse.SUCCESS, productResult));
}


exports.postProductLike = async function(req, res) {
    const { firebaseUID, productId } = req.body;

    if (!firebaseUID) return (response(baseResponse.USER_ID_EMPTY));
    if (!productId) return res.send(response(baseResponse.PRODUCT_ID_EMPTY));

    const productLikeResponse = await productService.postLike(firebaseUID, productId);

    return res.send(productLikeResponse);

}