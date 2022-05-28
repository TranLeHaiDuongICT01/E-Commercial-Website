const Payment = require('../models/paymentModel')
const Users = require('../models/userModel')
const Product = require('../models/productModel')

const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find({})
        res.status(200).json({ payments })
    } catch (error) {
        return res.status(200).json({ msg: error.message })
    }
}

const createPayment = async (req, res) => {
    const id = req?.user?.user
    const { cart, paymentId, address } = req.body
    try {
        const user = await Users.findById(id).select('name email')
        if (!user) return res.status(404).json({ msg: `User with id ${id} not found` })
        const { name, email } = user

        const payment = await Payment.create({
            user_id: id, name, email, cart, paymentId, address, status: true
        })

        for (let i = 0; i < cart?.length; i++) {
            const product = await Product.findByIdAndUpdate(cart[i]?._id, { sold: cart[i]?.sold + cart[i]?.quantity })
        }

        res.status(201).json({ payment })
    } catch (error) {
        console.log(error);
        return res.status(200).json({ msg: error.message })
    }
}

module.exports = {
    getPayments, createPayment
}