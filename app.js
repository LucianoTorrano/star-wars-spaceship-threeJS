const express = require('express');
const app = express();

//Middleware
app.use(express.static(__dirname + '/public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/index.html');
})

app.listen(3000,()=>{
    console.log( 'Server runing on port', 3000);
})

