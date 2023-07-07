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

//define swagger 's User schema
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - role
 *       properties:
 *         id:
 *           type: objecid
 *           description: The auto-generated id of the article
 *         name:
 *           type: string
 *           description: name of user
 *         email:
 *           type: string
 *           description: email of user
 *         gender:
 *           type: string
 *           description: gender of user
 *         address:
 *           type: string
 *           description: address of user
 *         company:
 *           type: string
 *           description: company user belonged to
 *         company_id:
 *           type: string
 *           description: company 's id
 *         password:
 *           type: string
 *           description: password of user
 *         role:
 *           type: string
 *           description: role of user
 *       example:
 *         id: d5fE_asz
 *         name: Hans Flutter
 *         email: Admin@example.com
 *         gender: Female
 *         role: Admin
 *         password: 123456
 */

//define swagger 's Company schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       required:
 *         - name
 *         - address
 *       properties:
 *         id:
 *           type: objecid
 *           description: The auto-generated id of the company
 *         name:
 *           type: string
 *           description: name of company
 *         address:
 *           type: string
 *           description: address of company
 *         account_number:
 *           type: string
 *           description: bank account number of company
 *         customer:
 *           type: string
 *           description: customers belonged to
 *       example:
 *         id: d5fE_asz
 *         name: Microsoft
 *         address: US
 *         account_number: Microsoft2023
 *         customer: 
 */


/**
 * @swagger
 * /api/company:
 *   get:
 *     summary: Retrieve a list of companies
 *     tags: [Company]
 *     responses:
 *       200:
 *         description: A list of company
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
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
//* route     api/company
//* desc      get all companies
//* access    Public
router.get('/',
  [],
  async (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors, })
    }

    try {

      const companies = await Company.find().sort({ _id: -1 })

      res.json(companies);

    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  })


/**
 * @swagger
 * /api/company/customer/{companyname}:
 *   get:
 *     summary: Retrieve a list of customers
 *     tags: [Company]
 *     responses:
 *       200:
 *         description: A list of customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
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
//* route     api/company/customer/:companyname
//* desc      get all customer
//* access    Public
router.get('/customer/:companyname',
  [],
  async (req, res) => {

    const errors = validationResult(req)

    const {companyname} = req.params;

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors, })
    }

   
    try {
      const company = await Company.findOne({name: companyname});
      
      let customers = [];
      if(company.customer!=''&&company.customer!=null) customers = company.customer.split(',');
      console.log(company.customer)
      console.log(customers)

      const sss = await User.find({_id:customers});
      console.log(sss)

      await res.json(sss);

    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  })


/**
 * @swagger
 * components:
 *   schemas:
 *     RegCompany:
 *       type: object
 *       required:
 *         - name
 *         - address
 *       properties:
 *         name:
 *           type: string
 *           description: name of company
 *         address:
 *           type: string
 *           description: address of company
 *       example:
 *         name: Microsoft
 *         address: US
 */


/**
 * @swagger
 * /api/company:
 *   post:
 *     summary: Register new company
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegCompany'
 *     responses:
 *       200:
 *         description: data of database
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
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
//* route     api/company
//* desc      Register new company
//* access    Public

router.post('/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
  ],
  async (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors, })
    }

    const { name, address } = req.body

    try {

      let company = await Company.findOne({ name })

      if (company) {
        return res.status(400).json({ errors: 'Company already exists' })
      }

      const account = name +  "2023";

      company = new Company({
        name,
        address,
        account_number: account,
        customer: ''
      })

      // const salt = await bcrypt.genSalt(10)

      // user.password = await bcrypt.hash(password, salt)

      await company.save()

      res.json({msg: 'Registered successfully.'});

    } catch (err) {
      console.error(err.message)
      res.status(500).json({errors:err.message})
    }
  })


/**
 * @swagger
 * components:
 *   schemas:
 *     InsertCustomer:
 *       type: object
 *       required:
 *         - customer_id
 *         - companyname
 *       properties:
 *         customer_id:
 *           type: string
 *           description: customer_id
 *         companyname:
 *           type: string
 *           description: company name
 *       example:
 *         customer_id: 64a1c9cf81ff8aaeac72063a
 *         companyname: Microsoft
 */


/**
 * @swagger
 * /api/company/customer:
 *   post:
 *     summary: Register customer to company
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InsertCustomer'
 *     responses:
 *       200:
 *         description: data of database
 *         content:
 *           application/json:
 *             schema:
 *               type: string    
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
//* route     api/company/customer
//* desc      Register new customer to company
//* access    Public
      
router.post('/customer',
[
  check('customer_id', 'UserId is required').not().isEmpty(),
  check('companyname', 'Company is required').not().isEmpty()
],
async (req, res) => {

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors, })
  }

  const { customer_id, companyname } = req.body

  try {

    const company = await Company.findOne({name: companyname})

    if (!company) {
      return res.status(400).json({ errors: 'Wrong company_id' })
    }

    let str = "";
    if(company.customer==''||company.customer=='null') str = customer_id
    else { str = `${company.customer},${customer_id}`}

    // const salt = await bcrypt.genSalt(10)

    // user.password = await bcrypt.hash(password, salt)
    
    const filter = { name: companyname };
    const update = { customer: str };
    const result = await Company.updateOne(filter, update);
    const res1 = await User.findById(customer_id);
    // res.json(result);
    return res.json(res1)

  } catch (err) {
    console.error(err.message)
    res.status(500).json({errors:err.message})
  }
})


/**
 * @swagger
 * /api/company/{id}:
 *  put:
 *    summary: Update the company by the id
 *    tags: [Company]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The company id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Company'
 *    responses:
 *      200: 
*         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
 *      404:
 *        description: The company was not found
 *      500:
 *        description: Some error happened
 */


//* method    PUT
//* route     api/company/:id
//* desc      Update company
//* access    Private

router.put('/:id', async (req, res) => {

    try {
      
      const companyId = req.params.id;
      const updateCompany = req.body; // Assuming the updated transactions data is sent in the request body
    
  
  
      // if (!transaction1) {
      //   return res.status(404).json({ error: 'Use other email' });
      // }
  
      
  
      // Find the company by ID and update the document
      const company = await Company.findByIdAndUpdate(companyId, updateCompany, { new: true });
    
      if (!company) {
        return res.status(404).json({ error: 'Company not found' });
      }

      const company1 = await Company.find().sort({ _id: -1 });
      return res.json(company1);
    
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  });


/**
 * @swagger
 * components:
 *   schemas:
 *     DelCustomer:
 *       type: object
 *       required:
 *         - companyname
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           description: customer 's id
 *         companyname:
 *           type: string
 *           description: company name
 *       example:
 *         id: 64a1c9cf81ff8aaeac72063a
 *         companyname: Microsoft
 */


  
/**
 * @swagger
 * /api/company/delcustomer:
 *   post:
 *     summary: delete customer in company
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DelCustomer'
 *     responses:
 *       200:
 *         description: data of database
 *         content:
 *           application/json:
 *             schema:
 *               type: string    
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
//* route     api/company/delcustomer
//* desc      Delete a customer in company
//* access    Private

router.post('/delcustomer/', [],
  async (req, res) => {
    try {
     
      const company = await Company.findOne({name:req.body.companyname})
      
      let dd = "";
      
      //console.log(company)
      const customers = company.customer.split(',');
      //console.log(customers)
      let ddd = false;
      customers.map((cc,index)=>{
        if(cc!=req.body.id) {
            if(index==0||ddd)
              dd += cc;
            else dd += `,${cc}`
        }else {
            if(index==0) ddd = true;
        }
      })
      //console.log(dd)
      const filter = { name: req.body.companyname };
      const update = { customer: dd };
      const result = await Company.updateOne(filter, update);

      
      res.json(result);

    } catch (err) {

      console.error(err.message)
      if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'User not found' })
      res.status(500).send('Server Error')

    }
  })


module.exports = router