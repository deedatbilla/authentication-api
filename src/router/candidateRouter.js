
const express = require('express')
const Candidate = require('../models/Candidate')
const multer = require('multer');
const uuidv4 = require('uuid/v4')
const router = express.Router()
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
const issue2options = {
    origin: true,
    methods: ["POST"],
    credentials: true,
    maxAge: 3600
  };
router.post('/candidate/image', cors(issue2options), upload.single('profileImg'), async(req, res) => {
    // add candidate profile image
    const url = req.protocol + '://' + req.get('host')
    try {
        const candidate = new Candidate({
            
            profileImg: url + '/public/' + req.file.filename
        })
        await candidate.save()
        res.status(201).send({ candidate,message:"success" })
    } catch (error) {
        res.status(400).send(error)
    }

})

router.get("/candidate/profile", async(req, res, next) => {


    try {
        const candidate = await Candidate.find()
        if (!candidate) {
            return res.status(401).send({error: 'candidate profile not found'})
        }
        
        res.send({ candidate, message:'candidate list retrieved successfully!'})
    } catch (error) {
        res.status(400).send(error)
    }
    
});
module.exports = router