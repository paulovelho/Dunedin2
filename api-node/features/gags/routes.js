"use strict";

module.exports = (app) => {
	var controller = require('./controller');

	let auth = controller.isAuthenticated.bind(controller);

	app.route('/gags')
		.get(auth, controller.getGags.bind(controller))
		.post(auth, controller.createGag.bind(controller));

	app.route('/gag/:id')
		.get(auth, controller.getGag.bind(controller))
		.put(auth, controller.updateGag.bind(controller))
		.delete(auth, controller.deleteGag.bind(controller));

	app.route('/search')
		.get(auth, controller.searchGags.bind(controller));
	app.route('/author')
		.get(auth, controller.searchAuthors.bind(controller));


};
