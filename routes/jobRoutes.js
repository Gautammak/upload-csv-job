const express = require('express');
const router = express.Router();
const { getJobStatus, cancelJob } = require('../controllers/jobStatusController');

router.get('/jobs/:id/status', getJobStatus);
router.delete('/jobs/:id', cancelJob);

module.exports = router;
