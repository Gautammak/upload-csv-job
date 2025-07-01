const Queue = require('bull');
const path = require('path');
require('dotenv').config();

const csvQueue = new Queue('csv-processing', process.env.REDIS_URL);

csvQueue.process(path.join(__dirname, 'processor.js'));

module.exports = csvQueue;

