const express = require('express');
const app = express();
app.use(express.json());

const  mongoose  = require("mongoose")
mongoose.connect("mongodb+srv://DipaliBohara:8076166878@cluster0.4wyyohq.mongodb.net/book_management")
    .then(() => { console.log("MongoDb is connected..."); })
    .catch(err => console.log(err))


const route = require('./routes/route');
app.use('/', route);


app.listen(process.env.PORT || 3000,function () { 
    console.log('express app started on the port ' + (process.env.PORT || 3000))});