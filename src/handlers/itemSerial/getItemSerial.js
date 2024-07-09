const { conn } = require('../../db');

const getItemSerial = async () => {
    try {
        await conn.authenticate();
        
        const serial = await conn.query('exec WZ_GetItemSerial');
        
        return serial[0][0][''];
    } catch (error) {
        throw new Error('Error get serial item');
    };
};

module.exports = { getItemSerial };