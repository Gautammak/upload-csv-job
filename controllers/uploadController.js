const path = require('path');
const csvQueue = require('../jobs/queue');
const csv = require('fast-csv');

const uploadCSV = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Please upload a CSV file.' });
    const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);

    const job = await csvQueue.add({
      filePath,
      originalName: req.file.originalname,
      uploadedAt: new Date(),
      userId: req.user._id  // for link job to user
    });

    res.status(200).json({
      message: 'CSV uploaded successfully and job added to queue.',
      jobId: job.id
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};


const downloadTemplate = (req, res) => {
  res.setHeader('Content-Disposition', 'attachment; filename="csv_template.csv"');
  res.setHeader('Content-Type', 'text/csv');

  const csvStream = csv.format({ headers: true });
  csvStream.write({ name: 'John Doe', email: 'john@example.com', phone: '9876543210', age: 30, city: 'Mumbai' });
  csvStream.write({ name: 'Jane Smith', email: 'jane@example.com', phone: '9123456789', age: 25, city: 'Delhi' });
  csvStream.end();
  csvStream.pipe(res);
};


module.exports = { uploadCSV, downloadTemplate };