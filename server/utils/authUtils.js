const { runStoredProcedure } = require('../services/dbService');
const sql = require('mssql');

async function checkLogin(userName, password) {
    // Call stored procedure — it checks both username and password
    const result = await runStoredProcedure('spCheckUserLogin', {
        userName: { type: sql.NVarChar(20), value: userName },
        password: { type: sql.NVarChar(20), value: password }
    });

    if (!result || !result.recordset || result.recordset.length === 0) {
        return null;
    }

    const user = result.recordset[0];

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

async function getUserById(userId) {
    const result = await runStoredProcedure('spGetUserById', {
        userId: { type: sql.Int, value: userId }
    });

    if (!result || !result.recordset || result.recordset.length === 0) {
        return null;
    }

    const user = result.recordset[0];
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

module.exports = { checkLogin, getUserById };
