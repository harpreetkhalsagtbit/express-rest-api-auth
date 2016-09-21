var express = require('express');
var Beer = require('../models/beer');

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
	apiRoutes.get('/beers', function(req, res) {
		// Use the Beer model to find all beer
		Beer.find(function(err, beers) {
			if (err)
				res.send(err);

			res.json(beers);
		});
	});

	// Create endpoint /api/beers for POSTS
	apiRoutes.post('/', function(req, res) {
		var beer = new Beer();

		// Set the beer properties that came from the POST data
		beer.name = req.body.name;
		beer.type = req.body.type;
		beer.quantity = req.body.quantity;

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