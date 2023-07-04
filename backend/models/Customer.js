const mongoose = require('mongoose')


//Customer collection
const CustomerSchema = new mongoose.Schema({
  //name of customer
  name: {
    type: String,
    required: true
  },
  //email of customer
  email: {
    type: String,
    required: true,
    unique: true
  },
  //gender of customer
  gender: {
    type: String
  },
  //address of customer
  address: {
    type: String,
    required: true
  },
  //avatar of customer
  avatar:{type:String},
  //company customer belonged to
  company: {
    type: String,
    required: true
  },
  //id of  Company collection 
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companys'
  },
})

module.exports = Customer = mongoose.model('customer', CustomerSchema)