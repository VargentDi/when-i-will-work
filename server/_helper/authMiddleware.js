var jwt = require('jsonwebtoken');
const config = require("./secretKey.json")
const buildErrorMessage = require("./error")
module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json(buildErrorMessage("Missing Auth Token"))
    }
    try {
        jwt.verify(req.headers.authorization.replace("Bearer ", ""), config.ACCESS_TOKEN_SECRET)
    } catch (error) {
        console.log(error.message)
        return res.status(401).json(buildErrorMessage(error.message))
    }
    next()
}