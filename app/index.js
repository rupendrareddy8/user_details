const express = require('express');

// Routes Import
const users = require("./users/index.js");

const router = express.Router();

// Adding Routes
router.use('/users', users);

module.exports = router
