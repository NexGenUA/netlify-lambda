const mongoose = require('mongoose');

const snSchema = new mongoose.Schema({
  serial: String,
  added: Boolean,
});

const Sn = mongoose.model('Sn', snSchema);

module.exports = Sn;
