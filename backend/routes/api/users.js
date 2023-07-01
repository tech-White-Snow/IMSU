const express   = require('express')
const router    = express.Router()
const gravatar  = require('gravatar')
const bcrypt    = require('bcryptjs')
const jwt       = require('jsonwebtoken')
const config    = require('config')

const { check, validationResult } = require('express-validator')

const User = require('../../models/User')

//* method    POST
//* route     api/users
//* desc      Register new user
//* access    Public



module.exports = router