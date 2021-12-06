module.exports = function(app) {
    const product = require('./productController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 전체 제품 조회
    app.get('/app/products', product.getProducts);

    // // 카테고리별 제품 조회
    // app.get('/app/products', product.getProductByCategory);

    // // 제품 상세 조회
    // app.get('/app/products/:productId', product.getProductById);

    // // 제품 좋아요 등록/해제
    // app.get('/app/products', product.postProductLike);

}