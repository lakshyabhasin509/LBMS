const express = require('express');
const app=express()
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
require('dotenv').config()




app.get('/',(req,res)=>{
    res.send("HI chawla")
})

app.listen(3000,()=>console.log("server is running on port 3000"))
