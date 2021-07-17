let faker = require('faker');
let fs = require('fs');
const moment = require('moment');
let config = {
    URL: "http://localhost:3000",
    VERSION: 'v1'
}
const generateEmployee = (index) => {
    let start_time = faker.date.recent()
    return {
        index: index,
        id: faker.datatype.uuid(),
        user_id: `${config.URL}/${config.VERSION}/users` + faker.datatype.uuid(),
        start_time: start_time,
        end_time: faker.date.between(start_time, generateend_time(start_time)),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };
};

const generateend_time = (start_time) => {
    let ranHours = Math.floor(Math.random() * 24)
    var end_time = moment(start_time).add(ranHours, 'hours').toISOString();
    return end_time
}

const generateShifts = (numUsers) => {
    return Array.from({ length: numUsers }, (v, i) => generateEmployee(i))
};

let shiftsObj = generateShifts(10)
fs.writeFileSync('shifts.json', JSON.stringify(shiftsObj, null, '\t'));
