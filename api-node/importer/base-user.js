"use strict";
var debugEnabled = true;
var log = require("color-logs")(debugEnabled, debugEnabled, __filename);

var User = require("../features/users/model");
var user_created = false;

function connect() {
	var connect = require("../services/connect");

	return new Promise((resolve, reject) => {
		connect(null, null, () => { console.info("connected"); resolve(); });
	});
}

(async () => {
	await connect();
	let baseUser = {
		email: "dunedin@paulovelho.com",
		password: "123",
		active: true
	};

	let u = new User(baseUser);
	log.info("creating user ", u);
	try {
		let model = await u.save();
		log.info("user base created: ", model);
		user_created = true;
		return model;
	} catch(err) {
		log.error(err);
	}
})();


(function wait () {
	log.info("waiting...");
	if (!user_created) setTimeout(wait, 1000);
})();
