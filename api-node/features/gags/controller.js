"use strict";
var debugEnabled = require("../../config").debug;
var log = require("color-logs")(debugEnabled, debugEnabled, __filename);

var Gag = require('./model');
var BaseApi = require("../../api");

class GagsController extends BaseApi {

  constructor() {
    super();
    this.gagLimit = 10;
  }

  cleanQuery(q) {
    if(!q) return null;
    return q.replace(/ *\([^)]*\) */g, "");
  }
  getPage(req) {
    let page = req.query.page;
    if(!page) page = 0;
    return page;
  }
  paginate(req) {
    let page = this.getPage(req);
    return page * this.gagLimit;
  }
  returnGagsWithQuery(query, req, res) {
    let limit = this.gagLimit+1;
    log.info("search query: ", query);

    return Gag.find(query)
      .limit(limit)
      .skip(this.paginate(req))
      .then(data => {
        let has_more = (data.length == limit);
        let page = this.getPage(req);
        if(has_more) data.pop();
        this.success_paginate(res, page, has_more, data);
      })
      .catch(err => this.exception(res, err));

  }

  getGags(req, res) {
    this.returnGagsWithQuery(null, req, res);
  }

  searchGags(req, res) {
    var query = {};
    
    var q = this.cleanQuery(req.query.q);
    if(q) query["content"] = { "$regex": q, "$options": "i" };
    var origin = req.query.origin;
    if(origin) query["origin"] = { "$regex": origin, "$options": "i" };
    var author = this.cleanQuery(req.query.author);
    if(author) query["author"] = { "$regex": author, "$options": "i" };

    this.returnGagsWithQuery(
      query,
      req, res);
  }

  searchAuthors(req, res) {
    var query = req.query.q;
    this.returnGagsWithQuery(
      { "author": { "$regex": query, "$options": "i" } },
      req, res);
  }

  getGag(req, res) {
    let id = req.params.id;
    Gag.findById(id)
      .then(model => this.success(res, model))
      .catch(err => this.exception(res, err));
  }

  createGag(req, res) {
    var model = new Gag(req.body);
    console.info("model: ", model);
    model.active = true;
    return new Promise((resolve, reject) => {
      model.save((err, model) => {
        if (err) {
          log.error("save Gag error", err);
          this.exception(res, err);
          return reject(err);
        }
        this.success(res, model);
        return resolve(model);
      });
    });
  }

  updateGag(req, res) {
    var id = req.params.id;

    Gag.update({ _id: id }, req.body)
      .then((model) => {
        this.getGagById(id)
          .then(model => this.success(res, model))
          .catch(err => this.exception(res, err));
      })
      .catch(err => this.exception(res, err));
  }

  async deleteGag(req, res) {
    var id = req.params.id;
    try {
      let gag = await Gag.findById(id)
      await gag.remove();
      return this.success(res, gag);
    } catch(ex) {
      return this.exception(res, ex);
    }
  }

}

module.exports = new GagsController();
