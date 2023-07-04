const mongoose = require('mongoose')


//user collection
const UserSchema = new mongoose.Schema({
  //name of user
  name: {
    type: String,
    required: true
  },
  //email of user
  email: {
    type: String,
    required: true,
    unique: true
  },
  //gender of user
  gender: {
    type: String,
    required: true
  },
  //address of user
  address: {
    type: String,
    required: true
  },
  //company user belonged to
  company: {
    type: String,
    required: true
  },
  //id of company user belonged to
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companys'
  },
  //password
  password: {
    type: String,
    required: true
  },
  //role of user
  role: {
    type: String,
    required: true
  },
  //avatar of user
  avatar:{
    type: String,
  }
  // date: {
  //   type: Date,
  //   default: Date.now
  // }

})

module.exports = User = mongoose.model('user', UserSchema)