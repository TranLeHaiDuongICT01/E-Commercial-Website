const router = require('express').Router()
const {
    getProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController')
const checkAuth = require('../middleware/checkAuth')
const checkAuthAdmin = require('../middleware/checkAuthAdmin')
router.route('/product')
    .get(getProducts)
    .post(checkAuth, checkAuthAdmin, createProduct)

router.route('/product/:id')
    .delete(checkAuth, checkAuthAdmin, deleteProduct)
    .patch(checkAuth, checkAuthAdmin, updateProduct)
    .get(getSingleProduct)

module.exports = router