async function selectProduct(connection) {
    const selectUserListQuery = `
    SELECT  productId, B.name as brand, P.name,  price, P.image, link 
    FROM Product P
    INNER JOIN Brand B
    ON P.brandId = B.brandId
    ;`;
    const [productRows] = await connection.query(selectUserListQuery);
    return productRows;
}

module.exports = {
    selectProduct
}