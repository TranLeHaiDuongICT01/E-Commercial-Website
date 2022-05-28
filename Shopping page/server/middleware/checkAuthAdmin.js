const Users = require('../models/userModel')

const checkAuthAdmin = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(403).json({ msg: 'Unauthenticated' })
        }
        const user = await Users.findById(req?.user?.user)
        if (!user || user?.length === 0) {
            return res.status(404).json({ msg: `User with id ${req?.user?.user} not found` })
        }
        if (user.role === 0) {
            return res.status(403).json({ msg: 'Unauthorized Admin' })
        }
        next()
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong!' })
    }
}

module.exports = checkAuthAdmin