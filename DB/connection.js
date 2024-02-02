//import mongoose
const mongoose = require('mongoose')

//get the connection string
const connectionString = process.env.DATABASE

//connect node.js/server with mongodb
mongoose.connect(connectionString).then((res)=>{
    console.log('server connected successfully with mongodb');
}).catch((err)=>{
    console.log(`mongodb failed to connect due to :${err}`);
})