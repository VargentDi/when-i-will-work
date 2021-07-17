/**
 * 
 * @param {object} query 
 * @param {array} shifts 
 * @returns 
 */
const findShiftsBasedOnRestrict = (query, shifts) => {
    console.log(shifts)
    if (query.start_time != undefined && query.end_time != undefined) {
        shifts = shifts.filter(e => {
            return e.start_time >= query.start_time && e.end_time <= query.end_time
        })
    }
    if (query.end_time) {
        shifts = shifts.filter(e => {
            return e.end_time <= query.end_time
        })
    }
    if (query.start_time) {
        shifts = shifts.filter(e => {
            return e.start_time >= query.start_time

        })
    }
    if (query.sort) {
        console.log("hitted this block")
        shifts = shifts.sort((a, b) => {
            date1 = new Date(a.created_at);
            date2 = new Date(b.created_at);
            return query.sort == "aesc" ? date1 - date2 : date2 - date1
        })
    }
    console.log(shifts)
    return shifts
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
    fs.writeFileSync('shifts.json', JSON.stringify(shifts, null, '\t'));
    return shiftObj
}

/**
 * 
 * @param {object} updateShift 
 * @param {array} shifts 
 */
const updateShifts = (updateShift, shifts) => {
    let fs = require("fs")
    let newShifts = shifts.map(e => {
        updateShift.index = e.index
        return e.id == updateShift.id ? updateShift : e
    })
    fs.writeFileSync('shifts.json', JSON.stringify(newShifts, null, '\t'));
    return newShifts
}

const deleteShift = (id, shifts) => {
    let fs = require("fs")
    var filtered = shifts.filter((e) => {
        return e.id != id
    });
    fs.writeFileSync('shifts.json', JSON.stringify(filtered, null, '\t'));
    return "ok"
}
module.exports = { findShiftsBasedOnRestrict, findShiftBasedOnId, validShiftBasedOnTimeInterval, postNewShiftToDb, updateShifts, deleteShift }