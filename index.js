//1)import dotenv
//loads .env file contents into process.env by default
require('dotenv').config()

//2)import express
const express=require('express')

//3)import cors
const cors=require('cors')

//import router
const router = require('./Routing/router')

//import connection.js
require('./DB/connection')

//4)create server
//Creates an Express application. The express() function is a top-level function exported by the express module.
const pfServer=express()

//5)use of cors by server
pfServer.use(cors())

//6)json parse
pfServer.use(express.json())

//server using the router
pfServer.use(router)

//pfserver use upload folder
//first arg - how other application use folder
//second arg - to export that particular folder - express.static()
pfServer.use('/uploads',express.static('./uploads'))

//7)customize port - bydefault,server runs at 3000
const PORT=4000 || process.env

//8)run server
pfServer.listen(PORT,()=>{
    console.log(`server running successfully at port number ${PORT}`);
})

//get request
pfServer.get('/',(req,res)=>{
    res.send(`get request`)
})

//post request
pfServer.post('/',(req,res)=>{
    res.send(`post request`)
})

//put request
pfServer.put('/',(req,res)=>{
    res.send(`put request`)
})

