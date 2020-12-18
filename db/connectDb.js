const mongoose = require('mongoose');
const monoUri = process.env.monoUri;

let isDbConnected = false;

dbConnect = async () => {
  if (!isDbConnected) {
    await mongoose.connect(monoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    isDbConnected = true;
  }
};

module.exports = dbConnect;
