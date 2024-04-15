"use strict";
var debugEnabled = require("../../config").debug;
var log = require("color-logs")(debugEnabled, debugEnabled, __filename);

var User = require('./model');
var BaseApi = require("../../api");

var mocks = require('../../test-helpers/_mocks');

class UsersController extends BaseApi {

  getUser(req, res) {
    let id = req.params.id;
    User.findById(id)
      .then(model => this.success(res, model))
      .catch(err => this.exception(res, err));
  }

  getUsers(req, res) {
    User.find()
      .then(model => this.success(res, model))
      .catch(err => this.exception(res, err));
  };

  createUser(req, res) {
    var model = new User(req.body);
    model.active = true;
    return new Promise((resolve, reject) => {
      model.save((err, model) => {
        if (err) {
          log.error("save user error", err);
          this.exception(res, err);
          return reject(err);
        }
        this.success(res, model);
        return resolve(model);
      });
    })
  }

  updateUser(req, res) {
    var id = req.params.id;
    let data = this.getToken(req);
    if(!data || data.user_id != id) return this.error(res, 401, "Denied");

    User.update({ _id: id }, req.body)
      .then((model) => {
        this.getUserById(id)
          .then(model => this.success(res, model))
          .catch(err => this.exception(res, err));
      })
      .catch(err => this.exception(res, err));
  }

  async deleteUser(req, res) {
    var id = req.params.id;
    try {
      let user = await User.findById(id)
      await user.remove();
      return this.success(res, user);
    } catch(ex) {
      return this.exception(res, ex);
    }
  }

}

module.exports = new UsersController();
