const express = require('express');
const reportController = require('../controllers/reportController');
const { authMiddleware, requireAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', reportController.getReports);
router.post('/', reportController.createReport);
router.put('/:id/verify', authMiddleware, requireAdmin, reportController.verifyReport);

module.exports = router;
