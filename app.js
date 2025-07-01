const express = require('express');
const authRoutes = require('./routes/authRoutes')
const uploadRoutes = require('./routes/uploadRoutes');
const jobRoutes = require('./routes/jobRoutes');
require('./config/db'); 
require('./jobs/queue');
require("dotenv").config(); 

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/upload', uploadRoutes);
app.use('/', jobRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
