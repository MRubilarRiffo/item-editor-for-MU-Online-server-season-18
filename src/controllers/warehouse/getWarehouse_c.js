const { getWarehouse_h } = require('../../handlers/warehouse/getWarehouse_h');

const getWarehouse_c = async (req, res) => {
    try {
        // const accountID = req.query.id;

        const accountID = 'Jacke';

        const warehouse = await getWarehouse_h(accountID);

        if (warehouse.error) {
            res.status(400).send(warehouse.error);
        } else {
            const response = {
                warehouseHex: warehouse
            };

            res.json(response);
        };
    } catch (error) {
        res.status(500).json({ error: 'Error get warehouse'});
    };
};

module.exports = { getWarehouse_c };