var express = require('express');
module.exports = function(app, passport) {

    // API ROUTES -------------------
    // get an instance of the router for api routes
    var apiRoutes = express.Router();

    // apply the routes to our application with the prefix /api
    app.use('/api', apiRoutes);

    // middleware that is specific to this router
    apiRoutes.use(function timeLog(req, res, next) {
        console.log('Time: ', Date.now());
        next();
    });

    // process the signup form
    apiRoutes.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/api/profile', // redirect to the secure profile section
        failureRedirect : '/api/failureRedirect', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // process the login form
    apiRoutes.post('/login', passport.authenticate('local-login', {
        successRedirect : '/api/profile', // redirect to the secure profile section
        failureRedirect : '/api/failureRedirect', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // process the signup form
    apiRoutes.get('/failureRedirect', function(req, res, next){
        res.send({
            logIn:"fail"
        })
    });

    // process the signup form
    apiRoutes.get('/profile', function(req, res, next){
        // console.log("res", res)
        console.log("req", req.user)
        res.send({
            logIn:"success"
        })
    });

    // routes ======================================================================
    // Why we passed 'apiRoutes' instead of 'app'?
    // because we need prefix for 'routes` as 'api/',
    // passing 'app' will reset the prefix
    // 
    // Why require here?
    // we need to pass app before loading module
    require('./routes/beers')(apiRoutes); // load our routes and pass in our app and fully configured passport
    // app.use('/beers', beers(app));

    // for dev purposes only
    app.get('*', function(res, req, next) {
        console.log("routes.js" )
        next();
    });
};