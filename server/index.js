const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const userRouter = require('./routes/userRoutes')
const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))

const PORT = process.env.PORT || 5000

app.use('/user', userRouter)
app.use('/api', require('./routes/categoryRoutes'))
app.use('/api', require('./routes/upload'))
app.use('/api', require('./routes/productRoutes'))

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server on port ${PORT}`);
    })
}).catch(err => {
    console.log(err);
})


