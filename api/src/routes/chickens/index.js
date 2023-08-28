const express = require('express');
const router = express.Router();

// Import every routes
const addChickenRoute = require('./addChicken');
const getChickenRoute = require('./getChickens');
const deleteChickenRoute = require('./deleteChicken');
const patchChickenRoute = require('./patchChicken');
const putChickenRoute = require('./putChicken')

// Add them to the router
router.use('/', addChickenRoute);
router.use('/', getChickenRoute);
router.use('/', deleteChickenRoute);
router.use('/', patchChickenRoute);
router.use('/', putChickenRoute);

module.exports = router;