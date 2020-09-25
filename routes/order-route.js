const router = require('express').Router()
let Order = require('../models/order-model')

router.route('/').get((req, res) => {
    Order.find().then(data => res.json(data)).catch(err => res.status(400).json(err))
})

router.route('/:id').get((req, res) => {
    Order.findById(req.params.id).then(data => res.json(data)).catch(err => res.status(400).json(err))
})

router.route('/update/:id').post((req, res) => {
    Order.findById(req.params.id).then(order => {
        order.orderNumber = req.body.orderNumber;
        order.billingDetails = req.body.billingDetails;
        order.ship = req.body.ship;

        order.save().then(() => res.json("Order updated")).catch(err => res.status(400).json(err))
    }).catch(err => res.status(400).json(err))
})

router.route('/new').post((req, res) => {
    const orderNumber = req.body.orderNumber
    const ship = req.body.ship
    const billingDetails = {
        name: req.body.billingDetails.name, 
        email: req.body.billingDetails.email, 
        address: {
            city: req.body.billingDetails.address.city,
            state: req.body.billingDetails.address.state,
            line1: req.body.billingDetails.address.line1, 
            line2: req.body.billingDetails.address.line2, 
            postal_code: req.body.billingDetails.address.postal_code
        }
    }
    const subtotal = req.body.subtotal
    const shipTotal = req.body.shipTotal
    const total = req.body.total

    const newOrder = new Order({orderNumber, ship, billingDetails, subtotal, shipTotal, total})

    newOrder.save().then(() => res.json(newOrder)).catch(err => res.status(400).json(err))
})

module.exports = router