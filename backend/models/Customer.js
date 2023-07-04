const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  gender: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  avatar:{type:String},
  company: {
    type: String,
    required: true
  },
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companys'
  },
})

module.exports = Customer = mongoose.model('customer', CustomerSchema)