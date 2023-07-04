const mongoose  = require('mongoose')
const config    = require('config')
const db        = config.get('mongoURI')

const connectDB = async () => {

  try {
console.log(db)
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })

    console.log('MongoDB connected')

  } catch (err) {

    console.error(err.message)
    process.exit(1)
  }
}

module.exports = connectDB