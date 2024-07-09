const itemsRoute = require('express').Router();

const { createItem } = require('../controllers/createItem/createItem');

itemsRoute.get('/create', createItem);

module.exports = itemsRoute;