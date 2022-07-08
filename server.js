if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express  = require('express');
const session  = require('express-session');
const bodyParser = require('body-parser');
const app      = express();
const port     = process.env.PORT || 8080;
const passport = require('passport');
const bcrypt = require('bcrypt');
// const flash = require('express-flash');
var flash    = require('connect-flash');

require('./config/passport')(passport);//initializing passport

app.use(bodyParser.urlencoded({
	extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true//save empty session
 } ));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); 


var mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "myschema"
});

con.connect(function(err) {
    if (err) {
        console.log('connecting error');
        return;
    }
    console.log('connecting success');
});

app.use(function(req, res, next) {
    req.con = con;
    next();
});




require('./app/routes.js')(app, passport); 
app.listen(port);
console.log('The magic happens on port ' + port);

