const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        min:6,
        max:255
    },
    email:{
        type:String,
        required:true,
        unique:true,
        min:6,
        max:255
    },
    password:{
        type:String,
        required:true,
        max:1024,
        min:6
    },
    books:[{

        bookId:{
            type:String,
            required:true,   
        }
        ,isPrivate:{
            type:Boolean,
            required:true,
            default:false
        }

    }],
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("User",userSchema)