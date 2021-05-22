const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')


const userRouter = require('./routes/userRoute')
const categoryRouter = require('./routes/categoryRoute')
const uploadRouter = require('./routes/upload')
const productRouter = require('./routes/productRouter')


const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles:true
}))

//db
const db = process.env.DATABASE_LOCAL

mongoose.connect(db, 
    {useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true}, err=>{
        if(err) throw err
        console.log('DB Connected');
    })

//middleware


//route
app.use('/user', userRouter)
app.use('/api', categoryRouter)
app.use('/api', uploadRouter)
app.use('/api', productRouter)

//port
const port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})


