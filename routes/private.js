const router=require('express').Router()
const authorized=require('../middleWare')
const User=require('../model/User')
const Book=require('../model/Book')

router
.get('/books',authorized, async (req,res)=>{

   res.json( await Book.find({username:req.username}))
})
.patch('/add/book',authorized,async(req,res)=>{
    ////////////Adding bookId to User's books Array////// 
    var objBook = { bookId:req.body.bookId, isPublic:req.body.isPublic };

User.findOneAndUpdate(
   { name:req.username }, 
   { $push: { books: objBook  } },
  function (error, success) {
        if (error) {
            res.send('error')
            console.log(error);
        } else {
            console.log(success);
        }
    });

})

module.exports=router