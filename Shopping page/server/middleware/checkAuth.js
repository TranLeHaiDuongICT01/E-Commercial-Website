const jwt = require('jsonwebtoken')

const checkAuth = (req, res, next) => {
    try {
        const token = req?.headers?.authorization?.split(' ')[1]
        if (!token) {
            return res.status(403).json({ msg: 'Unauthenticated' })
        }
        jwt.verify(token, process.env.JWT, (err, user) => {
            if (err) return res.status(403).json({ msg: 'Unauthenticated' })

            req.user = user
            next()
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong!' })
    }
}

module.exports = checkAuth