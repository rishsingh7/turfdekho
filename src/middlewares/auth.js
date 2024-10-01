const jwt = require('jsonwebtoken')
const User = require('../models/owners')
const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error("TOken not valid")
        }
        const decodedMessage = await jwt.verify(token, "yutt878y89y8yuhig78t87gi")
        const { _id } = decodedMessage
        const user = await UserActivation.findOne(_id)
        if (!user) {
            throw new Error("User not Present")
        }

        next()
    }
    catch (err) {
        res.status(400).send("Something went wrong" + err.message)
    }
}

module.exports = { userAuth }