const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Mongodb Connected Successfully"))
    .catch((err) => console.error("MongoDB Error while connect", err));
