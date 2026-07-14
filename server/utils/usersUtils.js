const { runStoredProcedure } = require('../services/dbService');
const sql = require('mssql');

async function getUsers() {
    const result = await runStoredProcedure('spGetUsers');
    if (!result || !result.recordset) {
        return [];
    }
    // Remove passwords from results
    return result.recordset.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    });
}

async function addUser(user) {
    // Store password as plain text (no hashing)
    const result = await runStoredProcedure('spAddUser', {
        userName: { type: sql.NVarChar(100), value: user.userName },
        password: { type: sql.NVarChar(255), value: user.password },
        email: { type: sql.NVarChar(255), value: user.email || '' },
        phone: { type: sql.NVarChar(50), value: user.phone || '' },
        roleId: { type: sql.Int, value: user.roleId || 1 }
    });

    return result;
}

async function deleteUser(userId) {
    const result = await runStoredProcedure('spDeleteUser', {
        userId: { type: sql.Int, value: userId }
    });
    return result;
}

module.exports = { getUsers, addUser, deleteUser };
