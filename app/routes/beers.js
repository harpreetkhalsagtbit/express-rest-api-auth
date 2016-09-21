var express = require('express');
var Beer = require('../models/beer');
var authController = require('../auth');

module.exports = function(apiRoutes) {

	// route middleware to verify a token
	// apiRoutes.use(function(req, res, next) {
	// });

	// for dev purposes only
	apiRoutes.get('*', function(req, res, next) {
		console.log({
			here: 'here *'
		})
		next();
	});

	// Create endpoint /api/beers for Get
	apiRoutes.get('/beers', authController.isAuthenticated, function(req, res) {
		// Use the Beer model to find all beer
		Beer.find(function(err, beers) {
			if (err)
				res.send(err);

			res.json(beers);
		});
	});

	// Create endpoint /api/beer for POSTS
	apiRoutes.post('/beer', function(req, res) {
		// Set the beer properties that came from the POST data
		var beer = new Beer({
			"name": req.body.name,
			"type": req.body.type,
			"quantity": req.body.quantity
		});

		// Save the beer and check for errors
		beer.save(function(err) {
			if (err)
				res.send(err);

			res.json({
				message: 'Beer added to the locker!',
				data: beer
			});
		});
	});

	return apiRoutes;
}