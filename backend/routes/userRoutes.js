const express = require('express');
const { getProfessors } = require('../controllers/userController');
const router = express.Router();

router.get('/professors', getProfessors);

module.exports = router;
