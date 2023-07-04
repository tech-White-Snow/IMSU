const express = require('express')
const router  = express.Router()
const request = require('request')
const auth    = require('../../middleware/auth')
const gravatar  = require('gravatar')
const bcrypt    = require('bcryptjs')
const jwt       = require('jsonwebtoken')
const config    = require('config')


const { check, validationResult } = require('express-validator')

const Company = require('../../models/Company');
const User    = require('../../models/User');
const Customer    = require('../../models/Customer');
const Transaction = require('../../models/Transaction');

//* method    GET
//* route     api/customers
//* desc      get all customer
//* access    Public

router.get('/', 
  [ ], 
  async (req, res) => {
    console.log("object")
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors, })
  }

  try {
    
    const employees = await Customer.find().sort({ _id: -1 })

      res.json(employees);
    
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//* method    POST
//* route     api/customers
//* desc      Register new user
//* access    Public

router.post('/', 
  [], 
  async (req, res) => {

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors, })
  }

  const { name, email, address  } = req.body

  try {
    
    let cus = await Customer.findOne({ email })

    if (cus) {
      return res.status(400).json({ errors: 'Email already exists' })
    }


    cus = new Customer({
      name,
      email,
      avatar:'/assets/avatars/avatar-siegbert-gottfried.png',
      gender:'',
      address,
      company:0
    })

    // const salt = await bcrypt.genSalt(10)

    // user.password = await bcrypt.hash(password, salt)

    await cus.save()

    const customer = await Customer.find().sort({ _id: -1 })

    res.json(customer);

  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//* method    PUT
//* route     api/customers/:id
//* desc      Update customer
//* access    Private

router.put('/:id', async (req, res) => {

  try {
    
    const customerId = req.params.id;
    const updatedCustomer = req.body; // Assuming the updated customer data is sent in the request body
  
    const customer1 = await Customer.findOne({email:updatedCustomer.email});


    // if (!customer1) {
    //   return res.status(404).json({ error: 'Use other email' });
    // }

    

    // Find the user by ID and update the document
    const customer = await Customer.findByIdAndUpdate(customerId, updatedCustomer, { new: true });
  
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    const employees = await Customer.find().sort({ _id: -1 });
    return res.json(employees);
  
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

//* method    DELETE
//* route     api/customers/:id
//* desc      Delete a customer
//* access    Private

router.delete('/:id', [],
  async (req, res) => {
    try {
      
      const customer = await Customer.findById(req.params.id)
  
      await customer.remove();
      const employees = await Customer.find().sort({ _id: -1 })

      res.json(employees);
  
    } catch (err) {
  
      console.error(err.message)
      if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'User not found' })
      res.status(500).send('Server Error')
  
    }
  })

module.exports = router