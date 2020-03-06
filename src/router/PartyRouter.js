const express = require('express')
const Party = require('../models/Party')
const router = express.Router()


router.post('/party', async (req, res) => {
    // Create a new party
    try {
        const party = new Party(req.body)
        await party.save()
       
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})   
 



module.exports = router