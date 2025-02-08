const jwt = require('jsonwebtoken')
const User = require('../models/User')

const AuthMiddleware = (req,res,next) => {
    let token = req.cookies.jwt
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, (error,decodeValue) => {
            if(error) {
                return res.status(401).json({ message : 'Unauthenticated Token' })
            } else {
                User.findById(decodeValue._id).then(user => {
                    req.user = user
                    next()
                })
            }
        })
    } else {
        return res.status(400).json({ message : 'token need to be provided' })
    }
}

module.exports = AuthMiddleware