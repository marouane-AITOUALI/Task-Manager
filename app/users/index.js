const express = require("express");
const usersController = require('./controller');
const router = express.Router();

router.post('/users', usersController.createUser);
router.put('/users/:_id', usersController.updateUser);
module.exports = router;