const express   = require('express');
const connectDB = require('./config/db');
const cors      = require('cors')
const multer = require("multer")

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


//swagger options
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'IM Service API Documentation',
        version: '1.0.0',
        description: 'API documentation for IM Service MERN stack application',
      },
      servers:[
        {
          url:"http://localhost:5000"
        },
      ],
    },
    apis: ['./server.js','./routes/api/users.js','./routes/api/customers.js','./routes/api/transaction.js'],
  };
  
const swaggerSpec = swaggerJSDoc(swaggerOptions);

const app = express();

//mongodb connect
connectDB();

//cors middleware
app.use(cors())

app.use(express.json({ extended: false }));

//app.get('/', (req, res) => res.send('API Running'));

//swaggerUI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// // Init swagger
// require("./config/swagger").swagger_init(app, express);

//* Define routes

app.use('/api/users',   require('./routes/api/users'));
app.use('/api/customers',   require('./routes/api/customers'));
app.use('/api/companys',   require('./routes/api/company'));
app.use('/api/transactions',   require('./routes/api/transaction'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
