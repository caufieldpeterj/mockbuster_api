// Dependencies
const express = require('express');
const mongoose = require('mongoose')
const session = require('express-session');
const bcrypt = require('bcrypt');
const cors = require('cors');


// import and configure dotenv
require('dotenv').config();

// Dependency Configuration
const APP = express();
const PORT = process.env.PORT;


/*
// == WHITELIST / CORS OPTIONS == // 
const whitelist = ['http://localhost:3000']
const corsOptions = {
  origin: function (origin, callback) {

    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not Allowed by CORS'))
    }
  }
}
*/

// Database configuration
const DBNAME = process.env.DBNAME;
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost:27017/${DBNAME}`;

// MIDDLEWARE
// APP.use(cors(corsOptions));

APP.use(express.urlencoded({ extended: false}))
APP.use(express.json());
APP.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}));


//controller logic
const movieController = require('./controllers/movies')
const sessionsController = require('./controllers/sessions')
const usersController = require('./controllers/users')
APP.use('/mockbuster', movieController);
APP.use('/sessions', sessionsController);
APP.use('/users', usersController);


// Configure Mongo connection
mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.once('open', ()=>{
    console.log(`Mongoose connected on PORT ${PORT}`)
})

// ===========================================
// Redirect
// ===========================================
APP.get('/', (req, res) => {
  res.redirect('/mockbuster');
});

// Listener
APP.listen(PORT,()=> {
    console.log('listening on ' + PORT)
});
