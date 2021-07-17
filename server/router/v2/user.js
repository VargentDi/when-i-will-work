'use strict';
var express = require('express');
var router = express.Router();
const userModle = require('../../model/users');
const buildErrorMessage = require("../../_helper/error")

router.get('/', (req, res) => {
    if (req.query) {
        return res.status(200).json(userModle.findUsersBasedOnquery(req.query))
    }
    return res.status(200).json(userModle.findUsers())
})

router.get('/:id', (req, res) => {
    try {
        return res.status(200).json({
            user: userModle.findUserById(req.params.id)[0]
        })

    } catch (error) {
        return res.status(404).json(buildErrorMessage())
    }
})
router.put('/:id', (req, res) => {
    console.log("hitted")
    try {
        if (req.body.type == undefined && req.body != null) {
            return res.status(403).json("Rejected")
        }
        updateObj = userModle.updateUserTypeById(req.body)
        return res.json({
            user: updateObj
        })
    } catch (error) {
        return res.status(500).json(buildErrorMessage("server error"))
    }
})
router.post('/', (req, res) => {
    console.log("get hitted")
    try {
        newObj = userModle.postNewUser(req.body)
        res.status(201).json({
            user: newObj
        })
    } catch (error) {
        return res.status(500).json(buildErrorMessage("server error"))

    }
})
router.delete('/:id', (req, res) => {
    try {
        userModle.deleteOneUser(req.params.id)
        res.status(204)
    } catch (error) {
        return res.status(500).json(buildErrorMessage("server error"))

    }
})
module.exports = router