const jwt = require('jsonwebtoken')

// const secretKey = 'KONSPIRASI_GLOBAL'
const secretKey = process.env.SECRET_KEY

const signPayLoad = (payload) => jwt.sign(payload, secretKey)
const verifyToken = (token) => jwt.verify(token, secretKey)

module.exports = {signPayLoad, verifyToken}