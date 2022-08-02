const router=require('express').Router()
const authorized=require('../middleWare')

router
.get('/private',authorized,(req,res)=>{
    res.send("private data")
})

module.exports=router