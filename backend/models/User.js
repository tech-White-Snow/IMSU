const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
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
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companys'
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },

  // date: {
  //   type: Date,
  //   default: Date.now
  // }

})

module.exports = User = mongoose.model('user', UserSchema)