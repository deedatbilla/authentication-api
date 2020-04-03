const express = require('express')
const Admin = require('../models/Admin')
const auth = require("../middleware/authAdmin")
const router = express.Router()

var cors = require('cors')
var whitelist = ["http://localhost:3000"]
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
  }




router.post('/admin',cors(corsOptionsDelegate), async (req, res) => {
    // Create a new admin
    try {
        const admin = new Admin(req.body)
        await admin.save()
        const token = await admin.generateAuthToken()
        res.status(201).send({ admin, token })
    } catch (error) {
        res.status(400).send(error)
    }
})   
 
router.post('/admin/login',cors(corsOptionsDelegate), async(req, res) => {
    //Login a registered admin
    try {
        const { email, password } = req.body
        const admin = await Admin.findByCredentials(email, password)
        if (!admin) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await admin.generateAuthToken()
        res.send({ admin, token })
    } catch (error) {
        res.status(400).send(error)
    }

})

router.get('/admin/me',cors(corsOptionsDelegate), auth, async(req, res) => {
    // View logged in admin profile
    res.send(req.admin)
})

router.post('/admin/me/logout',cors(corsOptionsDelegate), auth, async (req, res) => {
    // Log admin out of the application
    try {
        req.admin.tokens = req.admin.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.admin.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/admin/me/logoutall',cors(corsOptionsDelegate), auth, async(req, res) => {
    // Log admin out of all devices
    try {
        req.admin.tokens.splice(0, req.admin.tokens.length)
        await req.admin.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})



module.exports = router