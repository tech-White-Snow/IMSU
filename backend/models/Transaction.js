const mongoose  = require('mongoose')
const Schema    = mongoose.Schema


//Transaction collection
const TransactionSchema = new Schema({
 // amount of transaction
  amount: {
    type: String,
    required: true
  },
  // date of transaction
  date: {
    type: String,
    
  },
  //  id of company traded
  company_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companys'
  },
  //type of transaction
  type: {
    type: String,
    required: true
  },
  //detailed desctiption about transaction
  description: {
    type: String,
    required: true
  },

})

module.exports = Transaction = mongoose.model('transaction', TransactionSchema)