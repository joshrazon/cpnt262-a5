const mongoose = require('mongoose');

const partsSchema = new mongoose.Schema(
  {
    id:           Number,
    part:         String,
    name:         String,
    description:  String,
    url:          String,
    fullPrice:    Number
  }
);

module.exports = mongoose.model('Pcpart', partsSchema);