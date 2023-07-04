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


//define swagger 's Customer schema

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the article
 *         name:
 *           type: string
 *           description: name of customer
 *         email:
 *           type: string
 *           description: email of customer
 *         gender:
 *           type: string
 *           description: gender of customer
 *         address:
 *           type: string
 *           description: address of customer
 *         company:
 *           type: string
 *           description: company customer belonged to
 *         company_id:
 *           type: string
 *           description: company 's id
 *         avatar:
 *           type: string
 *           description: company 's id
 *         
 *       example:
 *         id: d5fE_asz
 *         name: Hans Flutter
 *         email: admin1@example.com
 *         gender: Femail
 *         
 */


/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Retrieve a list of customer
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: A list of customer
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Bad request
 *         
 *       500:
 *         description: Internal server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */


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


/**
 * @swagger
 * /api/customers:
 *   post:
 *     summary: register new Customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: data of database
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Bad request
 *         
 *       500:
 *         description: Internal server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */


//* method    POST
//* route     api/customers
//* desc      Register new customer
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


/**
 * @swagger
 * /api/customers/{id}:
 *  put:
 *    summary: Update the customer by the id
 *    tags: [Customers]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The customer id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Customer'
 *    responses:
 *      200:
 *        description: Updated customer list
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Customer'
 *      404:
 *        description: The customer was not found
 *      500:
 *        description: Some error happened
 */



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


/**
 * @swagger
 * /api/customers/{id}:
 *   delete:
 *     summary: Remove the customer by id
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The customer id
 * 
 *     responses:
 *       200:
 *         description: updated customer list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 *       404:
 *         description: The article was not found
 */




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