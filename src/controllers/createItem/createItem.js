const { generateHexItem } = require("../../functions/generateHexItem");
const { infoItem } = require("../../functions/infoItem");
const { smartSearch } = require("../../functions/smartSearch");
const { validation } = require("../../functions/validation");
const { getItemSerial } = require("../../handlers/itemSerial/getItemSerial");
const { getWarehouse_h } = require("../../handlers/warehouse/getWarehouse_h");
const { updateWarehouse } = require("../warehouse/updateWarehouse");

const createItem = async (req, res, next) => {
    try {
        const accountID = req.query.id;
        const level = validation(req.query.level);
        const durability = validation(req.query.durability);
        const skill = validation(req.query.skill);
        const luck = validation(req.query.luck);
        const life = validation(req.query.life);
        const exeOP = validation(req.query.exeOP);
        const setOP = validation(req.query.setOP);
        const HHOP = validation(req.query.HHOP);
        const op380 = validation(req.query.op380);
        const socket1 = validation(req.query.socket1);
        const socket2 = validation(req.query.socket2);
        const socket3 = validation(req.query.socket3);
        const socket4 = validation(req.query.socket4);
        const socket5 = validation(req.query.socket5);
        let itemGroup = req.query.itemGroup;
        let itemIndex = req.query.itemIndex;

        if (!itemGroup || !itemIndex) return res.status(400).json({ Error: 'Invalid ItemGroup or ItemIndex' });

        itemGroup = validation(itemGroup);
        itemIndex = validation(itemIndex);

        const serialItem = await getItemSerial();

        const hexItem = generateHexItem(level, durability, skill, luck, life, exeOP, setOP, HHOP, op380, socket1, socket2, socket3, socket4, socket5, itemGroup, itemIndex, serialItem);

        let warehouse = await getWarehouse_h(accountID);
        warehouse = warehouse[0]['BAUL'];

        const info = await infoItem(itemGroup, itemIndex);

        if (!info) return res.status(400).json({ error: "info no encontrada"});

        const itemX = parseInt(info.Width);
        const itemY = parseInt(info.Height);
        const slot = await smartSearch(warehouse, itemX, itemY);
        const test = slot * 32;

        console.log(slot);
        
        let newWarehouse;

        if (slot == 1337) {
            return res.status(400).json({ error: "Baul lleno"});
        } else {
            newWarehouse = warehouse.substring(0, test) + hexItem + warehouse.substring(test + 32);
            newWarehouse = "0x" + newWarehouse;
        };
        
        const a = await updateWarehouse(newWarehouse, accountID);

        res.json(a);

    } catch (error) {
        res.status(500).json({ error: error});
    };
};

module.exports = { createItem };