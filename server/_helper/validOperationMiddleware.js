const buildErrorMessage = require("./error")

const validOperationByUserInfo = (operationDetail, userDetail) => {
    let greenLight = true
    // console.log(operationDetail.operationType == "POST")
    if (operationDetail.operationType != 'GET') {
        greenLight = findAndValidUserLevelBasedOnOperation(operationDetail.levelRequired, userDetail)
    }
    if (greenLight != true) throw new Error("not valid level")
    return
}
function connectToDB() {
    let fs = require("fs")
    let rawdata = fs.readFileSync('user.json');
    let users = JSON.parse(rawdata);
    return users;
}
const findAndValidUserLevelBasedOnOperation = (requiredLevel, userDetail) => {
    users = connectToDB()
    var results = users.filter(function (user) { return user.userName == userDetail.userName });
    if (results.length == 0) throw new Error('No such User')
    return requiredLevel == "edit" ? results[0].accountLevel < 3 ? true : false : true
}

module.exports = (req, res, next) => {
    //only manager could change the shitfs: update, post and delete shift
    let jwt = require("jsonwebtoken")
    const config = require("./secretKey.json")
    let userInfo = jwt.verify(req.headers.authorization.replace("Bearer ", ""), config.ACCESS_TOKEN_SECRET)
    try {
        validOperationByUserInfo({ operationType: req.method, levelRequired: "edit" }, userInfo)
    } catch (error) {
        return res.status(401).json(buildErrorMessage(error.message))
    }
    next()
}