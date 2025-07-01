const csvQueue = require('../jobs/queue');

exports.getJobStatus = async (req, res) => {
  try {
    const job = await csvQueue.getJob(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    const status = await job.getState();
    const result = job.returnvalue || null;

    // Format response
    const response = {
      status,
      totalRows: result?.totalRows || 0,
      success: result?.success || 0,
      failed: result?.failed || 0,
      errors: result?.errors || []
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to get job status',
      message: error.message
    });
  }
};


exports.cancelJob = async (req, res) => {
  try {
    const job = await csvQueue.getJob(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    await job.remove();
    res.status(200).json({ message: 'Job cancelled successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to cancel job', message: error.message });
  }
};