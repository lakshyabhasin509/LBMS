const mongoose=require('mongoose')

const bookSchema=new mongoose.Schema({
    bookId:{
        book_id:{
            type:String,
            required:true,   
        }
    },
    name:{
        type:String,
        required:true,
        unique:true,
        min:6,
        default:'Admin',
        max:255

    },
    bookName:{
        type:String,
        required:true,
        unique:true,
        min:6,
        max:255
    },
    author:{
        type:String
    },
    genre:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    pdfUrl:{
        type:Date
    }
})

module.exports=mongoose.model("Book",bookSchema)