const express = require('express');
const cors = require('cors');
const app = express();
const accountsRouter = require('./controllers/accounts');

app.use(cors());
app.use(express.json());
app.use('/api', accountsRouter);

app.listen(5000, () => console.log('Backend is running at http://localhost:5000'));

