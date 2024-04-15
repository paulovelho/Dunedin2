"use strict";
const debugEnabled = true;
const log = require("color-logs")(debugEnabled, debugEnabled, __filename);

const StreamArray = require('stream-json/streamers/StreamArray');
const fs = require('fs');
const path = require('path');
const jsonStream = StreamArray.withParser();


var Gag = require("../features/gags/model");

// let filename = path.join(__dirname, 'docs', 'twitter.js'); // sample file
let filename = path.join(__dirname, 'docs', 'twitter', 'tweet.js');


function connect() {
	var connect = require("../services/connect");

	return new Promise((resolve, reject) => {
		connect(null, null, () => { console.info("connected"); resolve(); });
	});
}


var parseTweet = async (tw) => {
	let content = tw.full_text;
	let author = "paulovelho";
	let rtRegex = /RT @[^\s]+: /;
	let match = rtRegex.exec(content);

	if(match) {
		let rt = match[0];
		content = content.substr(rt.length);
		author = rt.substr(4, rt.length-6);
	}

	let gag = {
		date: new Date(tw.created_at),
		origin: 'twitter',
		content: content,
		author: '@'+author,
		location: "http://twitter.com/"+author+"/status/"+tw.id,
	}
	let g = new Gag(gag);
	try {
		let model = await g.save();
		log.info("saved ", model);
		return model;
	} catch(err) {
		log.error(err);
	}
}

jsonStream.on('data', ({key, value}) => {
	parseTweet(value);
});

jsonStream.on('end', () => {
	console.log('All done');
});

function importer() {
	var s = fs.createReadStream(filename)
		.pipe(jsonStream.input);
}


(async () => {
	await connect();
	importer();
})();
