
const express = require('express')
const Candidate = require('../models/Candidate')
const multer = require('multer');
const uuidv4 = require('uuid/v4')
const router = express.Router()
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
router.post('/candidate/image', upload.single('profileImg'), async(req, res) => {
    // add candidate profile image
    const url = req.protocol + '://' + req.get('host')
    try {
        const candidate = new Candidate({
            cid: req.body.cid,
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