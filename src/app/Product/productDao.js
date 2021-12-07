async function selectProduct(connection) {
    const selectUserListQuery = `
    SELECT  productId, name,  price, image
    FROM Product 
    ;`;
    const [productRows] = await connection.query(selectUserListQuery);
    return productRows;
}

async function selectProductById(connection, productId) {
    const selectUserListQuery = `
    SELECT  productId, B.name as brand, P.name,  price, P.image, link 
    FROM Product P
    INNER JOIN Brand B
    ON P.brandId = B.brandId
    WHERE productId = ?
    ;`;
    const [productRows] = await connection.query(selectUserListQuery, [productId]);
    return productRows;
}

module.exports = {
    selectProduct,
    selectProductById
}