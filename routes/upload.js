const router=require('express').Router()
router
.get('/',(req,res)=>{
    res.sendFile(__dirname.replace('routes','')+'index.html')
})
.post('/',(req,res)=>{

    if(req.files){
        
        console.log(req.files)
        const file=req.files.file
        const filename=file.name


        const uploadPath=__dirname.replace('routes','')+"uploads/"+filename

        file.mv(uploadPath,(err)=>{
            if(err)res.send(err)
            else{
                console.log("file uploaded")
            }
        })
        res.send(uploadPath)
    }
})


module.exports=router