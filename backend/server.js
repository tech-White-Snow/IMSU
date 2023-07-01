const express   = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();


app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

//* Define routes

app.use('/api/users',   require('./routes/api/users'));
app.use('/api/costomer',   require('./routes/api/customer'));
app.use('/api/company',   require('./routes/api/company'));
app.use('/api/transaction',   require('./routes/api/transaction'));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));