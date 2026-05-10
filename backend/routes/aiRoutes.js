const express = require('express');
const aiController = require('../controllers/aiController');

const router = express.Router();

router.post('/chat', aiController.chat);
router.get('/predictions', aiController.getPredictions);

module.exports = router;
