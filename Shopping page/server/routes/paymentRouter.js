const { getPayments, createPayment } = require('../controllers/paymentController')
const router = require('express').Router()
const checkAuth = require('../middleware/checkAuth')
const checkAuthAdmin = require('../middleware/checkAuthAdmin')
router.route('/payment')
    .get(checkAuth, checkAuthAdmin, getPayments)
    .post(checkAuth, createPayment)

module.exports = router