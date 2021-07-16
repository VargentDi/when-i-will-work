'use strict';
var express = require('express');
let faker = require('faker');
var router = express.Router();
const fs = require('fs');
const { findShiftsBasedOnRestrict, findShiftBasedOnId, validShiftBasedOnTimeInterval, postNewShiftToDb, updateShifts, deleteShift } = require('../model/util')

//mock the db call
function connectToDB() {
    let rawdata = fs.readFileSync('data.json');
    let shifts = JSON.parse(rawdata);
    return shifts;
}

router.get('/', (req, res) => {
    let shifts = connectToDB();
    return Object.keys(req.query).length === 0 ? res.json(shifts)
        : res.json(findShiftsBasedOnRestrict(req.query, shifts));
})
router.get('/:id', (req, res) => {
    let shifts = connectToDB();
    console.log(req.params)
    return res.json(findShiftBasedOnId(req.params.id, shifts));
})

router.post('/', (req, res) => {
    let shifts = connectToDB();
    let newShift = req.body
    newShift.index = shifts[shifts.length - 1].index + 1
    newShift.id = faker.datatype.uuid()
    newShift.start_time = new Date(req.body.start_time).toISOString()
    newShift.end_time = new Date(req.body.end_time).toISOString()
    try {
        validShiftBasedOnTimeInterval(newShift, shifts)
    } catch (error) {
        return res.status(400).json({
            error: 'invalid_interval',
            error_description: 'cannot create shift because time overlap'
        })
    }
    postNewShiftToDb(newShift, shifts)
    return res.json({
        shift: req.body
    })
})

router.put('/:id', (req, res) => {
    let shifts = connectToDB();
    let updateShift = req.body
    updateShift.id = req.params.id
    updateShift.start_time = new Date(req.body.start_time).toISOString()
    updateShift.end_time = new Date(req.body.end_time).toISOString()
    if (validShiftBasedOnTimeInterval(updateShift, shifts)) {
        return res.status(400).json({
            error: 'invalid_interval',
            error_description: 'cannot create shift because time overlap'
        })
    }
    updateShifts(updateShift, shifts)
    return res.json({
        shift: req.body
    })
})
router.delete('/:id', (req, res) => {
    let shifts = connectToDB();
    deleteShift(req.params.id, shifts)
    return res.json({
        "success": true
    })
})
module.exports = router;

