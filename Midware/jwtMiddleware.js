//import jwt
const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log('inside jwt middleware');
    const token = req.headers['authorization'].split(' ')[1]
    console.log(token);

    try{
        const jwtResponse = jwt.verify(token,"supersecretekey12345") //verify returns an object which contains the secrete info and the iat which is the additional info(time of issue of jwt token)
        console.log(jwtResponse);
        req.payload = jwtResponse.userId
        next()

    } catch(err){
        res.status(401).json('Authorization failed .... please login')
    }



    
}

module.exports = jwtMiddleware