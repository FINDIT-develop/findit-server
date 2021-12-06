// 모든 유저 조회
async function selectUser(connection) {
    const selectUserListQuery = `SELECT id, firebaseUID FROM User;`;
    const [userRows] = await connection.query(selectUserListQuery);
    return userRows;
}

// userId 회원 조회
async function selectUserId(connection, userId) {
    const selectUserIdQuery = `SELECT id, firebaseUID FROM User WHERE id = ?;`;
    const [userRow] = await connection.query(selectUserIdQuery, userId);
    return userRow;
}

// 유저 생성
async function insertUserInfo(connection, firebaseUID) {
    const insertUserInfoQuery = `
          INSERT INTO User(firebaseUID)
          VALUES (?);
      `;
    const insertUserInfoRow = await connection.query(
        insertUserInfoQuery,
        firebaseUID
    );

    return insertUserInfoRow;
}



module.exports = {
    selectUser,
    selectUserId,
    insertUserInfo,
};