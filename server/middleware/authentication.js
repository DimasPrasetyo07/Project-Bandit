const { verifyToken } = require("../helpers/jwt");
const {User} = require("../models");

async function authentication (req, res, next)  {
    try {
        let access_token = req.headers.access_token
        if (!access_token) {
            throw ({name : 'Not_Login'})
        }
        
        let payload = verifyToken(access_token)
        let user = await User.findByPk(payload.id)
        if (!user) {
            throw({name: 'Not_Login'})
        }
        req.user = {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role
        }
        next()
    } catch (err) {
        next (err)
        
        
    }
}

module.exports = authentication