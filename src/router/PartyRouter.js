const express = require('express')
const Party = require('../models/Party')
const router = express.Router()
const multer = require('multer');
const uuidv4 = require('uuid/v4')
var cors = require('cors')
const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
var whitelist = ['https://ghana-market-association.firebaseapp.com']
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: true } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
  }


 
router.post('/party',cors(corsOptionsDelegate), upload.single('partyImg'), async(req, res) => {
    // add party data
    const url = req.protocol + '://' + req.get('host')
    try {
        const party = new Party({
            
            partyImg: url + '/public/' + req.file.filename,
            partyName:req.body.partyName
        })
        await party.save()
        res.status(201).send({ party,message:"success" })
    } catch (error) {
        res.status(400).send(error)
    }

})

router.get("/fetchallparties",cors(corsOptionsDelegate), async(req, res, next) => {


    try {
        const party = await Party.find()
        if (!party) {
            return res.status(401).send({error: 'no parties were found'})
        }
        
        res.send({ party, message:'party list retrieved successfully!'})
    } catch (error) {
        res.status(400).send(error)
    }
    
});
module.exports = router