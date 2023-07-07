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
  //address of company
  address:{
    type: String
  },
  //customers of company
  customer:{
    type: String
  }
})

module.exports = Company = mongoose.model('company', CompanySchema)