"use strict";
var Chance = require('chance');
var chance = new Chance();

exports.getRandomUser = (type) => {
	return {
		email: chance.email(),
		password: chance.hash(),
		active: true
	};
};
