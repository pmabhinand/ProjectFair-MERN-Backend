//logic to resolve the request
//import model
const users = require('../Modals/userSchema')

//import jwt
const jwt = require('jsonwebtoken')

exports.register = async (req,res)=>{
    //logic for register
    console.log('inside controller register function');
    //extract data from request body
    const {username,email,password} = req.body

  try { const existuser = await users.findOne({email})
    if(existuser){
        res.status(406).json('Account already exists....Please Login')
    }
    else{
       //create an object for the model
       const newUser = new users({
        username,
        email,
        password,
        github:"",
        linkedin:"",
        profile:""
       })
       //save  function in mongoose - to permenently store this data in mongodb
       await newUser.save()

        //response
        res.status(200).json(newUser)
    }}
    catch(err){
        res.status(404).json('Register request failed due to',err)
    }
    
}

//logic for login

exports.login = async(req,res)=>{
    console.log('inside controller function');

    const {email,password} = req.body

    try {const existingUser = await users.findOne({email,password})
    console.log(existingUser);

    if(existingUser){
       
        const token = jwt.sign({userId:existingUser._id},'supersecretekey12345')  //first argument is the data that is send inside the token and the second argument is the key based on which the token is generated

        res.status(200).json({
            existingUser,
            token
        })
    }
    else{
        res.status(406).json('Incorrect email id or password')
    }}catch(err){
        res.status(401).json('login failed due to ',err)
    }
}

//edit profile
exports.editUser = async(req,res)=>{
   const userId = req.payload
   const {username,email,password,github,linkedin,profile} = req.body

   const profileImage = req.file?req.file.filename:profile

   try{
    const updateUser = await users.findByIdAndUpdate({_id:userId},{username,email,password,github,linkedin,profile:profileImage},{new:true})

    await updateUser.save()
    res.status(200).json(updateUser)
   }
   catch(err){
      res.status(401).json(err)
   }
}