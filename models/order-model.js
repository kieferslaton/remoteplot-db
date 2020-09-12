const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    orderNumber: String, 
    ship: Array, 
    billingDetails: {
        name: String, 
        email: String, 
        address: {
            line1: String, 
            line2: String, 
            city: String, 
            state: String, 
            postal_code: String
        }
    }

})

const Order = mongoose.model('Order', OrderSchema)
module.exports = Order