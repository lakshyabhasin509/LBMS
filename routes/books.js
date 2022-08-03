const router=require('express').Router()
const Book=require('../model/Book')
const authorized=require('../middleWare')

router
.post('/add',authorized,(req,res)=>{
    const book=new Book({
        
    })
})

module.exports=router