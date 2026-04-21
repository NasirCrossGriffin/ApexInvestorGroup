const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const portfolioEntrySchema = new Schema({
  title: String, 
  body: String,
  path: String,
  date: { type: Date, default: Date.now },
  hidden: Boolean,
});

module.exports = mongoose.model('PortfolioEntry', portfolioEntrySchema);
