const Users = require('../models/userModel')
const Payment = require('../models/paymentModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const register = async (req, res, next) => {
    const { name, email, password } = req.body
    try {
        const user = await Users.findOne({ email: email })

        if (user) {
            return res.status(400).json({ msg: 'The email already exists.' })
        }
        if (password.length < 6) {
            return res.status(400).json({ msg: 'Password must contain at least 6 characters.' })
        }

        const hashed = await bcrypt.hash(password, 10)

        const newUser = await Users.create({ name, email, password: hashed })

        const token = jwt.sign({ user: newUser._id }, process.env.JWT, { expiresIn: '1d' })

        const refreshToken = jwt.sign({ user: newUser._id }, process.env.REFRESH_TOKEN, { expiresIn: '7d' })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            path: '/user/refresh_token',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json({ accessToken: token, user: newUser._id, role: newUser.role, cart: newUser.cart })

    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const user = await Users.findOne({ email: email })
        if (!user) {
            return res.status(404).json({ msg: 'Email is not registered yet' })
        }
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            return res.status(400).json({ msg: 'Wrong password' })
        }

        const token = jwt.sign({ user: user._id }, process.env.JWT, { expiresIn: '1d' })

        const refreshToken = jwt.sign({ user: user._id }, process.env.REFRESH_TOKEN, { expiresIn: '7d' })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            path: '/user/refresh_token'
        })

        return res.status(201).json({ accessToken: token, user: user._id, role: user.role, cart: user.cart })

    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}

const logout = async (req, res, next) => {
    try {
        res.clearCookie('refreshToken', { path: '/user/refresh_token' })
        return res.status(200).json({ msg: 'Logged out' })
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}

const refreshToken = (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken || refreshToken?.length === 0) {
            return res.status(400).json({ msg: 'Please login ro Register' })
        }
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
            if (err) return res.status(400).json({ msg: 'Please login ro Register' })
            const accessToken = jwt.sign({ user: user.user }, process.env.JWT, { expiresIn: '1d' })
            return res.json({ accessToken })
        })

    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}

const getUser = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(402).json({ msg: 'Unauthenticated' })
        }
        const id = req?.user?.user
        const user = await Users.findById(id).select('-password')
        if (!user || user?.length === 0) {
            return res.status(404).json({ msg: `User with id ${id} not found` })
        }
        return res.status(200).json({ user })

    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}

const updateUser = async (req, res, next) => {
    const { cart } = req.body
    try {
        if (!req.user) {
            return res.status(402).json({ msg: 'Unauthenticated' })
        }
        const id = req?.user?.user
        const user = await Users.findById(id).select('-password')
        if (!user || user?.length === 0) {
            return res.status(404).json({ msg: `User with id ${id} not found` })
        }

        const updatedUser = await Users.findByIdAndUpdate(id, { cart: cart })

        return res.status(200).json({ user: updatedUser })

    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}

const getUserHistory = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(402).json({ msg: 'Unauthenticated' })
        }
        const id = req?.user?.user
        const user = await Users.findById(id).select('-password')
        if (!user || user?.length === 0) {
            return res.status(404).json({ msg: `User with id ${id} not found` })
        }
        const history = await Payment.find({ user_id: id }).sort('-createdAt')
        return res.status(200).json({ history })
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}

module.exports = {
    register,
    login,
    refreshToken,
    logout,
    getUser,
    updateUser,
    getUserHistory
}