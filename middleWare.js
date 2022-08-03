const jwt=require('jsonwebtoken')
// middleware function

function authenticateToken(req,res,next) {
    const token=req.header('Access_Token')
    if(!token)return res.status(401).send("Access Denied")


    
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err)res.status(403).send("Unauthorized Token")
        req.user=user
        next()
    })

   
}

module.exports=authenticateToken