const express = require('express')
const userRouter = require('./router/user')
const candidateRouter=require('./router/candidateRouter')
const port = process.env.PORT
require('./db/db')

const app = express()
var cors = require('cors')
app.use(express.json())
app.use(userRouter)
app.use(candidateRouter)


//   var whitelist = ['https://ghana-market-association.firebaseapp.com']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
app.use(cors())
app.use('/public', express.static('public'));
app.use((req, res, next) => {
    // Error goes via `next()` method
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
   
}) 