const express = require('express')
const userRouter = require('./router/user')
const port = process.env.PORT
require('./db/db')

const app = express()
var cors = require('cors')
app.use(express.json())
app.use(userRouter)
app.use(cors())

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
   
}) 