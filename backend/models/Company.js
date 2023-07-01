const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

const CompanySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  account_number: {
    type: String,
    required: true,
  },
})

module.exports = Company = mongoose.model('company', CompanySchema)