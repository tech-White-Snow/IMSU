const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

const TransactionSchema = new Schema({
  amount: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: Date.now,
  },
  company_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companys'
  },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },

})

module.exports = Transaction = mongoose.model('transaction', TransactionSchema)