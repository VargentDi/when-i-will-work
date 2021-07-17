const mockUserDBcall = () => {
    let fs = require("fs");
    let rawdata = fs.readFileSync('users.json');
    let users = JSON.parse(rawdata);
    return users;
}
module.exports = { mockUserDBcall }
