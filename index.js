require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload');
const errorMiddelwer = require('./middelwers/error.middelwer');
const  app = express();
//json data jonatish uchun midelwares
//app.use(requiestTime)
app.use(express.json())
app.use(cookieParser({}))
app.use(fileUpload({}))
app.use(express.static('static'))
//Routes
app.use('/post/api',require('./routes/post.route'))
app.use('/api/auth',require('./routes/auth.route'))
app.use(errorMiddelwer)

const PORT = process.env.PORT ||2000   
const botstrap = async()=>{
    try {
        await mongoose.connect(process.env.DB_URL).then(()=> console.log('mongodb connect'))
        app.listen(PORT, ()=>{
            console.log(`listen to- http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log(`whtis mongo db errors:${error}`)
    }
}
botstrap()