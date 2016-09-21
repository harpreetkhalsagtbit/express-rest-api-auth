var express = require('express');
var User = require('../models/user');

module.exports = function(apiRoutes, passport) {
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
        // console.log("req", req.user)
        res.send({
            logIn:"success"
        })
    });
}