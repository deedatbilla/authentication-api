const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const AdminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    password: {
        type: String,
        required: true,
        maxLength: 4,
        minLength: 4,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

AdminSchema .pre('save', async function (next) {
    // Hash the password before saving the admin model
    const admin = this
    if (admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 8)
    }
    next()
})

AdminSchema .methods.generateAuthToken = async function() {
    // Generate an auth token for the admin
    const admin = this
    const token = jwt.sign({_id: admin._id}, process.env.JWT_KEY)
    admin.tokens = admin.tokens.concat({token})
    await admin.save()
    return token
}

AdminSchema .statics.findByCredentials = async (email, password) => {
    // Search for a admin by email and password.
    const admin = await Admin.findOne({ email} )
    if (!admin) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, admin.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return admin
}

const Admin = mongoose.model('Admin', AdminSchema )

module.exports = Admin