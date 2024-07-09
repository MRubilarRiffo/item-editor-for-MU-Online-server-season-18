const { Router } = require('express');
const warehouseRoute = require('./warehouseRoute');
const itemsRoute = require('./itemsRoute');

const router = Router();

router.use('/warehouse', warehouseRoute);
router.use('/items', itemsRoute);

module.exports = router;