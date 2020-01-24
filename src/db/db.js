const mongoose = require('mongoose')
 const url="mongodb://localhost:27017/e-voting" 
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})         