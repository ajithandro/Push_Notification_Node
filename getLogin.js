
//npm lib//
require('dotenv').config();
const express = require('express');
const app =  express();
// const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const firebase = require('firebase-admin');


//express connection//

// const PORT = 3000;

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser : true,useUnifiedTopology:true});
const db = mongoose.connection
db.on('error',(error) => console.error(error));
db.once('open', () => console.log('Database Created Success'));
// db.dropCollection("subscribers", function (err, result) {

//     if (err) {

//         console.log("error delete collection");

//     } else {

//         console.log("delete collection success");

//     }

// });
app.use(express.json());

const usersRouters = require('./routes/subscribers');
app.use('/subscribers',usersRouters);

//push Notification


app.listen(3000,()=> console.log('Server Connected now'));

