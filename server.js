const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use(cors());

const connection = process.env.MONGODB_SRV;
mongoose.connect(connection, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(() => console.log("Database connected successfully.")).catch(err => console.log(err));

const helloRouter = require('./hello')
const stripeRouter = require('./stripe')
const orderRouter = require('./routes/order-route')

app.use('/hello', helloRouter)
app.use('/stripe', stripeRouter)
app.use('/orders', orderRouter)

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server started on port`)
});