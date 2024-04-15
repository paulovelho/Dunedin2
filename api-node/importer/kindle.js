"use strict";
const debugEnabled = true;
const log = require("color-logs")(debugEnabled, debugEnabled, __filename);

const fs = require('fs');
const path = require('path');
const es = require('event-stream');

var Gag = require("../features/gags/model");

//let filename = path.join(__dirname, 'docs', 'clippings.txt'); // sample code
//let filename = path.join(__dirname, 'docs', 'Kindle_201704.txt');
let filename = path.join(__dirname, 'docs', 'Kindle_2019.txt');


function connect() {
	var connect = require("../services/connect");

	return new Promise((resolve, reject) => {
		connect(null, null, () => { console.info("connected"); resolve(); });
	});
}

async function saveClipping(clip) {
	console.info("save clipping ", clip);
	let g = new Gag(clip);
	try {
		let model = await g.save();
//		log.info("saved ", model);
		return model;
	} catch(err) {
		log.error(err);
	}
}


let clipping = null;

var newClipping = () => {
	clipping = {
		author: false,
		content: "",
		origin: 'kindle',
		location: false,
		date: false,
	};
}

var parseLine = async (line) => {
	if(line == "==========") {
		let clippingToSave = JSON.parse(JSON.stringify(clipping));
		newClipping();
		console.info("******************* NEXT!");
		let cl = await saveClipping(clippingToSave);
		return cl;
	}

	if(!line) return;
	if(!clipping.author) {
		clipping.author = line;
		return clipping;
	}
	if(!clipping.location) {
		let location = line.split("| Added on ");
		clipping.date = new Date(location[1]);
		clipping.location = location[0];
		return clipping;
	}
	clipping.content += line + "\n";
	return clipping;
}

(async () => {
	await connect();
	newClipping();
	var s = fs.createReadStream(filename)
		.pipe(es.split())
		.pipe(es.mapSync(parseLine));
})();

