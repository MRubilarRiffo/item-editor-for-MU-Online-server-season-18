const warehouseRoute = require('express').Router();

const { getWarehouse_c } = require('../controllers/warehouse/getWarehouse_c');

warehouseRoute.get('/', getWarehouse_c);

module.exports = warehouseRoute;