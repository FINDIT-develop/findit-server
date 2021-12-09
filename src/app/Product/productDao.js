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

async function selectLike(connection, userId, productId) {
    const selectLikeQuery = `SELECT * FROM ProductLike WHERE userId = ? AND productId = ? ;`;
    const LikeRows = await connection.query(selectLikeQuery, [userId, productId]);
    return LikeRows;
}

async function insertLike(connection, userId, productId) {
    const selectLikeQuery = `INSERT INTO ProductLike(userId, productId) VALUES(?, ?);`;
    const LikeRows = await connection.query(selectLikeQuery, [userId, productId]);
    return LikeRows;
}

async function deleteLike(connection, userId, productId) {
    const selectLikeQuery = `DELETE FROM ProductLike WHERE userId = ? AND productId = ?;`;
    const LikeRows = await connection.query(selectLikeQuery, [userId, productId]);
    return LikeRows;
}

module.exports = {
    selectProduct,
    selectProductById,
    selectLike,
    insertLike,
    deleteLike,
}