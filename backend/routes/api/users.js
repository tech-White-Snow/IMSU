const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const fs = require('fs')

const AWS_ACCESS_KEY_ID = "AKIAVBHONSQBZMPWQAUF";
const AWS_SECRET_ACCESS_KEY = "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";
const BUCKET = "fadaimageupload";

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1'
});
const s3Content = new AWS.S3();

const { check, validationResult } = require('express-validator')

const User = require('../../models/User')
const Transaction = require('../../models/Transaction')
const Customer = require('../../models/Customer')

const schema = require('../../swagger/schema');

//define swagger 's user schema
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
 *         gender: Femail
 *         role: Admin
 *         password: 123456
 */

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
 * /api/users:
 *   get:
 *     summary: Retrieve a list of employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: A list of employees
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
//* route     api/users
//* desc      get all user
//* access    Public
router.get('/',
  [],
  async (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors, })
    }

    try {

      const employees = await User.find().sort({ _id: -1 })

      res.json(employees);

    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  })


/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: email
 *         password:
 *           type: string
 *           description: password
 *       example:
 *         email: admin@example.com
 *         password: 123456
 */



/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login and get database
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: data of database
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

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: email
 *         password:
 *           type: string
 *           description: password
 *       example:
 *         email: admin@example.com
 *         password: 123456
 */



/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: register new user
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: data of database
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

//* method    POST
//* route     api/users
//* desc      Register new user
//* access    Public

//* method    POST
//* route     api/users
//* desc      Register new user
//* access    Public

router.post('/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('role', 'Role is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  async (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors, })
    }

    const { name, email, gender, role, password } = req.body

    try {

      let user = await User.findOne({ email })

      if (user) {
        return res.status(400).json({ errors: 'User already exists' })
      }

      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      })

      user = new User({
        name,
        email,
        avatar,
        gender,
        role,
        address: 'BB',
        company: 0,
        password
      })

      // const salt = await bcrypt.genSalt(10)

      // user.password = await bcrypt.hash(password, salt)

      await user.save()

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )

    } catch (err) {
      console.error(err.message)
      res.status(500).json({errors:err.message})
    }
  })

//* method    POST
//* route     api/users/login
//* desc      Login user
//* access    Public
router.post('/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  async (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors, })
    }

    const { email, password } = req.body

    try {

      let user = await User.findOne({ email })

      if (!user || user.password != password) {
        return res.status(400).json({ errors: "Wrong email or password." })
      }

      const employees = await User.find().sort({ _id: -1 })
      const customers = await Customer.find().sort({ _id: -1 })
      const transactions = await Transaction.find().sort({ _id: -1 })
      res.json({
        employees,
        customers,
        transactions,
        myInfor: user
      })

    } catch (err) {
      console.error(err.message)
      res.status(500).send({errors:err.message})
    }
  })

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 * 
 *     responses:
 *       200:
 *         description: updated user list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: The article was not found
 */

//* method    DELETE
//* route     api/users/:id
//* desc      Delete a user
//* access    Private

router.delete('/:id', [],
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id)

      await user.remove()
      const employees = await User.find().sort({ _id: -1 })

      res.json(employees);

    } catch (err) {

      console.error(err.message)
      if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'User not found' })
      res.status(500).send('Server Error')

    }
  })

/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *    summary: Update the user by the id
 *    tags: [Employees]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: Updated User list
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */

//* method    PUT
//* route     api/users/:id
//* desc      Update user
//* access    Private

router.put('/:id', async (req, res) => {

  try {

    const userId = req.params.id;
    const updatedUser = req.body; // Assuming the updated customer data is sent in the request body

    const user1 = await User.findOne({ email: updatedUser.email });


    // if (!customer1) {
    //   return res.status(404).json({ error: 'Use other email' });
    // }



    // Find the user by ID and update the document
    const user = await User.findByIdAndUpdate(userId, updatedUser, { new: true });

    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }
    const employees = await User.find().sort({ _id: -1 });
    return res.json(employees);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});


//* method    POST
//* route     api/users/avatar
//* desc      Upload user's avatar
//* access    Public

const upload = multer({ dest: "avatar/" });

router.post('/avatar',
  upload.single("file"),
  async (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors, })
    }
    // console.log(req.body);
    const {id} = req.body;

    try {

      // const user = await User.findById(id);
      

      //console.log(user)

      // if (!user) {
      //    return res.status(400).json({ errors: 'User does not exists' })
      // }
       
      const image = req.file;

      const fileStream = fs.createReadStream(image.path)
 
      const s3Params = {
        Bucket: BUCKET,
        Key: image.originalname,
        Body: fileStream
      };
 
      s3Content.upload(s3Params, async function(err, data) {
        if (err) {
          console.log('Error uploading file:', err);
        } else {
          console.log('File uploaded successfully. Location:', data.Location);
          // // return res.json(data.Location);
          // const newUser = {
          //   ...user,
          //   avatar: data.Location
          // }

          const filter = { _id: id };
          const update = { avatar: data.Location };

          const result = await User.updateOne(filter, update);
          const user = await User.findById(id);
          res.json(user);
        }
      });

      //////////////////////////////////////////////////////

    } catch (err) {
      console.error(err.message)
      return res.status(500).send('Server Error')
    }
  }
)
module.exports = router