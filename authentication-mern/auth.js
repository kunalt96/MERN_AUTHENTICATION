const jwt = require('jsonwebtoken');
const jwtSecret = 'mytoken'

module.exports = (req,res,next)=>{
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json({message:'Cannot be verified'})
    }
    try{
        const decoded = jwt.verify(token,jwtSecret);
        req.user = decoded.user;
        next();
    }
    catch(err){
        res.status(401).json({message:'Invalid token'})
    }
}

