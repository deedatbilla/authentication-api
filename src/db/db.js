const mongoose = require('mongoose')
const MONGODB_URL= "mongodb+srv://deedat5:Portable24198@cluster0-tkvnj.mongodb.net/voters?retryWrites=true&w=majority"
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})         