const mongoose = require('mongoose')
//console.log(`url is ${process.env.MONGODB_URL}` )
const MONGODB_URL= "mongodb+srv://deedat5:Portable24198@cluster0-tkvnj.mongodb.net/voter_database?retryWrites=true&w=majority"
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})         