const jwt = require('jsonwebtoken')
const knex = require('../connection')

const tokenvalidation = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ message: 'Token required' })
    }

    const token = authorization.replace('Bearer ', '')
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET)

        const user = await knex('client').where({id}).returning('*')
        if (!user) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        const { passcode, ...loggedUser } = user
        req.user = loggedUser
        next()
    } catch (error) {
        if(error.message === "jwt malformed") return res.status(401).json({ message: "Invalid token."})
        if(error.message === "invalid signature") return res.status(401).json({ message: "Invalid token."})
        if(error.message === "invalid token") return res.status(401).json({ message: "Invalid token."})
        if(error.message === "jwt expired") return res.status(401).json({ message: "Invalid token."})
        return res.status(500).json({ mensagem: 'Internal error.' })
    }
}

module.exports = tokenvalidation;