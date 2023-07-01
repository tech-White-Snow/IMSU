const express = require('express')
const router  = express.Router()
const request = require('request')
const config = require('config')
const auth    = require('../../middleware/auth')

const { check, validationResult } = require('express-validator')

const Company = require('../../models/Company');
const User    = require('../../models/User');
const Customer    = require('../../models/Customer');
const Transaction = require('../../models/Transaction');







module.exports = router