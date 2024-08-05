const express = require('express');
const app = express()
const mongoose = require('mongoose');
const cors = require('cors');
const vdrRoute = require('./routes/vendorRoute');
const admRoute = require('./routes/adminRoute');

mongoose.connect('mongodb://localhost:27017/catchyy')  
.then(() => console.log('DB Connected..'))
.catch((err) => console.log(err.message))

app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:4200'],
}))

app.use('/', express.static('public'))

app.use('/', vdrRoute)
app.use('/admin', admRoute)

app.listen(3000, () => console.log('Server is running..!'));