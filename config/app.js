const path = require('path');
let cors = require('cors');
const express = require('express');
let logger = require('morgan');
let passport = require('passport');

let errorHandler = require("./error-handler");

//Database setup
let mongoose = require('mongoose');
let dbURI = require('./config');

// Connect to the Database
mongoose.connect(dbURI.AtlasDB);

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=>{
  console.log('Connected to MongoDB...');
});

const app = express();

// Enables cors.
app.use(cors());
app.options('*', cors());

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let inventoryRouter = require('../routes/inventory');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Sets up passport
app.use(passport.initialize());


app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/inventory', inventoryRouter);

app.use(express.static(path.join(__dirname,'../public'))); // <== correct public directory here

app.get("*", (req,res)=> {
  res.sendFile(path.join(__dirname, '../public/index.html'))
});


//Matt was here, heoku deployment?


/**
 * Any error handler middleware must be added AFTER you define your routes.
 */
app.use(errorHandler);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json({ statusCode: 404, message: "The endpoint does not exist."});
});


module.exports = app;
