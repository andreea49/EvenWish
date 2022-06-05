var express = require('express');
var SuggestionDB = require('../models/Suggestion')
var router = express.Router();
var debug = require('debug')('routes:suggestion');
const { Op } = require("sequelize");
const sequelize = require("../models/index")

router.route('/get').post(async (req, res) => {
  try {
    var { keyword } = req.body;
    debug("/suggestion/get: %O", keyword);
    keyword = "%" + keyword + "%";
    const users = await SuggestionDB.findAll({attributes: ['text'], where: { keyword: {[Op.like]: keyword }}});
    return res.status(200).json({"suggestions": users.map(a => a.text)});
  } catch (error) {
    debug("/suggestion/get error: %O ", error);
    res.status(500).json(error);
  }
});

module.exports = router;