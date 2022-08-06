const router=require('express').Router()
const Book=require('../model/Book')
const authorized=require('../middleWare')

router
.post('/add',authorized, async(req,res)=>{

    console.log("add book");

    const book=new Book({
        username:req.username,
        bookName:req.body.bookName,
        pdfUrl:req.body.pdfUrl,
        isPublic:req.body.isPublic
    })
     try{
        const savedBook=await book.save()
        res.send(savedBook._id)

    }catch(err){
        res.status(400).send(err)
    }
    console.log(req.username);
   
})

.get('/',(req,res)=>{
   const books= Book.find({isPublic:true},(err,result)=>{
    if(!err){
        res.json(result);
        console.log(result)
    }
    else {
        res.send(err)
        console.log(err)
   }})
})
module.exports=router