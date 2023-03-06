const express = require('express');
const app = express();
const port = 3000;
const DB_URL="mongodb+srv://harish953:harish12@cluster0.hqg8c1n.mongodb.net/?retryWrites=true&w=majority"

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const createError = require('http-errors');
const dbConfig = require('./configs/db.config');
const authConfig = require('./configs/auth.config');
require('dotenv').config();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World!'));
app.use((error,req,res,next)=>{
    next(createError.NotFound("This route does not exist"));
});
console.log("jkalnrjlgnalk----->",dbConfig.DB_URL);

// Connect to MongoDB
mongoose.connect(DB_URL,()=>{
    console.log("Connected to MongoDB");
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
