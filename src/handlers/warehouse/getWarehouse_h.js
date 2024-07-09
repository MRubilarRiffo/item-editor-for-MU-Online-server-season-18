const { Sequelize } = require('sequelize');
const { conn } = require('../../db');
const { QueryTypes } = require('sequelize');
const { getItemSerial } = require('../itemSerial/getItemSerial');

const getWarehouse_h = async (accountID) => {
    try {
        await conn.authenticate();
        
        const query = `SELECT CONVERT(VARCHAR(MAX), (SELECT Items FROM warehouse WHERE AccountID = :accountID), 2) AS BAUL`;

        await getItemSerial();

        return await conn.query(query, {
            type: QueryTypes.SELECT,
            replacements: { accountID: accountID },
        });

    } catch (error) {
        throw new Error('Error get warehouse');
    };
};

module.exports = { getWarehouse_h };