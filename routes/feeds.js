const express = require('express');
const router = express.Router();

const feedController = require('../controllers/feedController');

router.get('/', feedController.getFeedList);
router.post('/', feedController.createdFeed);

module.exports = router;
