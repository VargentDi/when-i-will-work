let faker = require('faker');
let fs = require('fs');
const moment = require('moment');

const generateEmployee = (index) => {
    let start_time = faker.date.recent()
    return {
        index: index,
        id: faker.datatype.uuid(),
        user_id: faker.datatype.number(),
        start_time: start_time,
        end_time: faker.date.between(start_time, generateend_time(start_time))
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

let dataObj = generateShifts(10)
fs.writeFileSync('data.json', JSON.stringify(dataObj, null, '\t'));
