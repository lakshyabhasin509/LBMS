const express = require('express');
const app=express()
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
require('dotenv').config()

const bookRoute=require('./routes/books')
const authRoute=require('./routes/auth')
const privateRoute=require('./routes/private')

app.use(express.json())
// connect to DB
mongoose.connect(process.env.DB_CONNECT,
{
    useNewUrlParser:true
},
()=>{
    console.log('DataBase connected') 
})


// Routes
app.use('/api/user',authRoute)
app.use('/api/user',privateRoute)
app.use('/api/books',bookRoute)

app.listen(3000,()=>console.log("server is running on port 3000"))
