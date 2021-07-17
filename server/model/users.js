let faker = require('faker');
const encryptPassword = (password) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt)
        .update(req.body.password)
        .digest("base64");
    return salt + "$" + hash
}


const findUsers = () => {
    let fs = require("fs")
    let rawdata = fs.readFileSync('user.json');
    let users = JSON.parse(rawdata);
    return users;
}
const findUsersBasedOnquery = (limits) => {
    const { firstName, lastName, userName, page, sort, numberPerpage } = limits;
    let users = mockUserDBcall();
    if (firstName) {
        users = users.filter(r => r.firstName === firstName);
    }
    if (lastName) {
        users = users.filter(r => r.lastName === lastName);
    }
    if (userName) {
        users = users.filter(r => r.userName === userName);
    }
    if (page) {
        users = users.slice((page - 1) * numberPerpage, page * numberPerpage)
    }
    if (sort) {
        users = users.sort((a, b) => {
            date1 = new Date(a.created_at);
            date2 = new Date(b.created_at);
            return sort == "aesc" ? date1 - date2 : date2 - date1
        })
    }
    return (users);
}
const findUserById = (id) => {
    let users = mockUserDBcall();
    return users.filter(r => r.useId === id);

}
const updateUserTypeById = (newObj) => {
    let users = mockUserDBcall();
    let updatedObj
    users.map(e => {
        if (e.userId == newObj.id) {
            e.type = newObj.type
            updatedObj = e
            return e
        }
    })
    fs.writeFileSync('users.json', JSON.stringify(users, null, '\t'));
    return updatedObj
}
const postNewUser = (userObj) => {
    let users = mockUserDBcall();
    const { firstName, lastName, password } = userObj
    if (!firstName || !lastName || !password) throw new Error("missing require value")
    userObj.created_at = new Date().toISOString
    userObj.updated_at = new Date().toISOString
    userObj.type = 2
    userObj.accountLevel = 3
    userObj.userId = faker.datatype.uuid()
    users.push(userObj)
    fs.writeFileSync('users.json', JSON.stringify(users, null, '\t'));
    return userObj
}

const deleteOneUser = (id) => {
    let users = mockUserDBcall();
    users.filter(e => {
        return e.userId != id
    })
    fs.writeFileSync('users.json', JSON.stringify(users, null, '\t'));
}
module.exports = {
    encryptPassword,
    findUsers,
    findUsersBasedOnquery,
    findUserById,
    updateUserTypeById,
    postNewUser,
    deleteOneUser
}

function mockUserDBcall() {
    let fs = require("fs");
    let rawdata = fs.readFileSync('users.json');
    let users = JSON.parse(rawdata);
    return users;
}
