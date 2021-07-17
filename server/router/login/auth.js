
var jwt = require('jsonwebtoken');
const config = require("../../_helper/secretKey.json")
const fs = require("fs")
const buildErrorMessage = require("../../_helper/error")
function connectToDB() {
    let rawdata = fs.readFileSync('users.json');
    let users = JSON.parse(rawdata);
    return users;
}

const validAuthRequest = ({ userName, password }, users) => {
    var results = users.filter(function (user) { return user.password == password && user.userName == userName });
    if (results.length == 0) throw new Error('user login invalid')
    return results
}
module.exports = (req, res) => {
    let userName = req.body.userName
    let password = req.body.password
    let users = connectToDB()
    try {
        user = validAuthRequest({ userName, password }, users)
    } catch (error) {

        return res.status(401).json(buildErrorMessage(error.message))
    }
    let payload = { userName: userName, exp: Math.floor(Date.now() / 1000) + (60 * 60 * 2) }

    //create the access token with the shorter lifespan
    let accessToken = jwt.sign(payload, config.ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
    })

    return res.json({
        accessToken: accessToken,
        tokenType: "Bearer",
        expiresIn: 60 * 60,
        userName: userName,
        accountLevel: user[0].accountLevel
    })
}