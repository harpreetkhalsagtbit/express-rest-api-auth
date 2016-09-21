// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
// var mongoose = require('mongoose');
// var passport = require('passport');
// var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var cors         = require("cors");
var compression  = require("compression");
var helmet 		 = require("helmet");
// var configDB = require('./config/database.js');

// configuration ===============================================================
// mongoose.connect(configDB.url); // connect to our database

// require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

// For full access to every url and request
// app.use(cors());

// Restricted Access
app.use(cors({
	// origin: ["http://localhost:3001"],
	// methods: ["GET", "POST"],
	allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(compression());
// Armoring the API with Helmet


// app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
// app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
// require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.get("/", function(req, res) {
	res.json({status: "My API is alive!"});
});

// launch ======================================================================
app.listen(port, function() {
	console.log("API is Running...")
});
console.log('The magic happens on port ' + port);

// module.exports = app;