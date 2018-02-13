const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema({
  stock: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    requires: 'Stock must have a name'
  }
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;
