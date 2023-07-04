const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

//Company collection
const CompanySchema = new Schema({
  //company name
  name: {
    type: String,
    required: true,
  },
  //account number of company
  account_number: {
    type: String,
    required: true,
  },
})

module.exports = Company = mongoose.model('company', CompanySchema)