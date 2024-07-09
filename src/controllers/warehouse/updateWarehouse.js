const { conn } = require('../../db');
const { QueryTypes } = require('sequelize');

const updateWarehouse = async (newWarehouse, accountID) => {
    try {        
        const query = 'UPDATE warehouse SET Items = CONVERT(varbinary(max), :newWarehouse, 1) WHERE AccountID = :accountID';

        return await conn.query(query, {
            type: QueryTypes.UPDATE,
            replacements: { newWarehouse, accountID },
        });
        
    } catch (error) {
        throw new Error(`Error updating warehouse: ${error.message}`);
    };
};

module.exports = { updateWarehouse };