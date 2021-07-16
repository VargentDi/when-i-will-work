/**
 * 
 * @param {object} query 
 * @param {array} shifts 
 * @returns 
 */
const findShiftsBasedOnRestrict = (query, shifts) => {
    if (query.start_time != undefined && query.end_time != undefined) {
        console.log("hit this block")
        return shifts.filter(e => {
            return e.start_time >= query.start_time && e.end_time <= query.end_time
        })
    } else if (query.end_time) {
        return shifts.filter(e => {
            return e.end_time <= query.end_time
        })
    } else {
        return shifts.filter(e => {
            return e.start_time >= query.start_time

        })
    }
}

/**
 * 
 * @param {number} id 
 * @param {array} shifts
 * @returns 
 */
const findShiftBasedOnId = (id, shifts) => {
    return shifts.filter(e => {
        return e.id == id
    })
}
/**
 * 
 * @param {number} user_id 
 * @param {array} shifts 
 */
const findShiftBasedOnUserId = (user_id, shifts) => {
    return shifts.filter(e => {
        return e.user_id == user_id
    })
}
/**
 * 
 * @param {object} validObj 
 * @param {array} shifts 
 */
const validShiftBasedOnTimeInterval = (validObj, shifts) => {
    let moment = require("moment")
    var duration = moment.duration(end.diff(startTime));
    var hours = duration.asHours();
    if (hours < 0 || hours > 24) {
        throw new Error('not a valiad time interval');
    }
    let validResult = findShiftBasedOnUserId(validObj.user_id, shifts).some(e => {
        return (!((moment(validObj.end_time).diff(moment(e.start_time))) < 0 ||
            (moment(validObj.start_time).diff(moment(e.end_time))) > 0))
    })
    if (validResult) {
        throw new Error('not a valiad time interval')
    }
    return validObj
}
/**
 * 
 * @param {object} shiftObj 
 * @param {array} shifts 
 */
const postNewShiftToDb = (shiftObj, shifts) => {
    let fs = require("fs")
    shifts.push(shiftObj)
    fs.writeFileSync('data.json', JSON.stringify(shifts, null, '\t'));
}

/**
 * 
 * @param {object} updateShift 
 * @param {array} shifts 
 */
const updateShifts = (updateShift, shifts) => {
    let fs = require("fs")
    let newShifts = shifts.map(e => {
        //todo: fix the shallow copy
        return e.id == updateShift.id ? updateShift : e
    })
    fs.writeFileSync('data.json', JSON.stringify(newShifts, null, '\t'));
    return newShifts
}

const deleteShift = (id, shifts) => {
    let fs = require("fs")
    var filtered = shifts.filter((e) => {
        return e.id != id
    });
    fs.writeFileSync('data.json', JSON.stringify(filtered, null, '\t'));
}
module.exports = { findShiftsBasedOnRestrict, findShiftBasedOnId, validShiftBasedOnTimeInterval, postNewShiftToDb, updateShifts, deleteShift }