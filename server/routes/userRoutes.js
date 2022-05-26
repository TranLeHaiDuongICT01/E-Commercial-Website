const router = require("express").Router()
const { register, refreshToken, login, logout, getUser } = require('../controllers/userController')
const checkAuth = require('../middleware/checkAuth')
router.post('/register', register)
router.get('/refresh_token', refreshToken)
router.post('/login', login)
router.get('/logout', logout)
router.get('/infor', checkAuth, getUser)

module.exports = router