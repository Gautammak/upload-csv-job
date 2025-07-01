const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const Record = require('../models/Record.model.js');
const { validateCSV } = require('../utils/validations.js');

mongoose.connect('mongodb://127.0.0.1:27017/csv_user')
  .then(() => console.log("Processor MongoDB connected"))
  .catch(err => console.error(" MongoDB error:", err.message));

module.exports = async (job) => {
  const filePath = job.data.filePath;
  return new Promise((resolve, reject) => {
    const validUsers = [];
    const failedRows = [];
    let totalProcessed = 0, successCount = 0;

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        totalProcessed++;
        const { isValid, data, errors } = validateCSV(row);

        if (isValid) {
          validUsers.push(data);
        } else {
          failedRows.push({ row, errors });
        }
      })
      .on('end', async () => {
        try {

          if (validUsers.length > 0) await Record.insertMany(validUsers, { ordered: false });
          successCount = validUsers.length;

          resolve({
            totalRows: totalProcessed,
            success: successCount,
            failed: failedRows.length,
            errors: failedRows.map((item, index) => ({ row: index + 2, reason: item.errors.join(', ') }))
          });
        } catch (err) {
          console.error("Error inserting to DB:", err);
          reject(err);
        }
      });
  });
};
