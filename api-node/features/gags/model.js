"use strict";
var debugEnabled = require("../../config").debug;
var log = require("color-logs")(debugEnabled, debugEnabled, __filename);

var bcrypt = require("bcrypt-nodejs");
var mongoose = require("mongoose") //.set('debug', debugEnabled);
var Schema = mongoose.Schema;

var sch = new Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  hash: {
    type: String,
    unique: true,
  },
  origin: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  used_in: {
    type: String,
  },
}, {
  timestamps: true
});

// Pre-save of user to database, hash password if password is modified or new
sch.pre("save", function (next) {
  var gag = this,
      SALT_FACTOR = 5;

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.content+this.author, salt, null, (err, hash) => {
      if (err) return next(err);
      this.hash = hash;
      next(null, this);
    });
  });
});


module.exports = mongoose.model("Gag", sch, "Gags");
