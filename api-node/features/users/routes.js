"use strict";

module.exports = (app) => {
  var base
	var controller = require('./controller');

  let auth = controller.isAuthenticated.bind(controller);

	app.route('/users')
		.get(auth, controller.getUsers.bind(controller))
		.post(auth, controller.createUser.bind(controller));

	app.route('/user/:id')
		.get(auth, controller.getUser.bind(controller))
		.put(auth, controller.updateUser.bind(controller))
		.delete(auth, controller.deleteUser.bind(controller));
};
