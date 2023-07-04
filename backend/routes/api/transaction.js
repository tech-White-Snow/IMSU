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

//define swagger 's transaction schema

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - amount
 *         - type
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the article
 *         amount:
 *           type: string
 *           description: amount of transaction
 *         type:
 *           type: string
 *           description: type of transaction
 *         date:
 *           type: string
 *           description: date of transaction
 *         company:
 *           type: string
 *           description: company       
 *       example:
 *         id: d5fE_asz
 *         amount: $10000
 *         description: transaction
 *         date: 23 July 2023
 */

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Retrieve a list of Transactions
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: A list of Transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
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
//* route     api/transactions
//* desc      get all transaction
//* access    Public

router.get('/', 
  [ ], 
  async (req, res) => {

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors, })
  }

  try {
    
    const employees = await Transaction.find().sort({ _id: -1 })

      res.json(employees);
    
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})


/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: register new transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       200:
 *         description: updated transaction list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
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
//* route     api/transactions
//* desc      Register new transaction
//* access    Public

router.post('/', 
  [], 
  async (req, res) => {

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors, })
  }

  const { date, type, amount ,  description } = req.body

  try {
    

    
    cus = new Transaction({
      date,
      type,
      amount,
      description
    })

    // const salt = await bcrypt.genSalt(10)

    // user.password = await bcrypt.hash(password, salt)

    await cus.save()

    const transaction = await Transaction.find().sort({ _id: -1 })

    res.json(transaction);
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

/**
 * @swagger
 * /api/transactions/{id}:
 *  put:
 *    summary: Update the transaction by the id
 *    tags: [Transactions]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The transaction id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Transaction'
 *    responses:
 *      200:
 *        description: Updated transaction list
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Transaction'
 *      404:
 *        description: The transaction was not found
 *      500:
 *        description: Some error happened
 */


//* method    PUT
//* route     api/transactions/:id
//* desc      Update transactions
//* access    Private

router.put('/:id', async (req, res) => {

  try {
    
    const transactionId = req.params.id;
    const updatedTransaction = req.body; // Assuming the updated transactions data is sent in the request body
  
    const transaction1 = await Transaction.findOne({email:updatedTransaction.email});


    // if (!transaction1) {
    //   return res.status(404).json({ error: 'Use other email' });
    // }

    

    // Find the user by ID and update the document
    const transaction = await Transaction.findByIdAndUpdate(transactionId, updatedTransaction, { new: true });
  
    if (!transaction) {
      return res.status(404).json({ error: 'transactions not found' });
    }
    const employees = await Transaction.find().sort({ _id: -1 });
    return res.json(employees);
  
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @swagger
 * /api/transactions/{id}:
 *   delete:
 *     summary: Remove the transaction by id
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The transaction id
 * 
 *     responses:
 *       200:
 *         description: updated transaction list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: The article was not found
 */


//* method    DELETE
//* route     api/transactions/:id
//* desc      Delete a transaction
//* access    Private

router.delete('/:id', [],
  async (req, res) => {
    try {
      
      const transaction = await Transaction.findById(req.params.id)
       
      await transaction.remove();
      const employees = await Transaction.find().sort({ _id: -1 })
     
      res.json(employees);
  
    } catch (err) {
  
      console.error(err.message)
      if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'User not found' })
      res.status(500).send('Server Error')
  
    }
  })



module.exports = router