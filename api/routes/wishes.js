var express = require('express');
var WishDB = require('../models/Wish')
var router = express.Router();
var debug = require('debug')('routes:wishes');
const { Op } = require("sequelize");
const sequelize = require("../models/index")

router.route('/list').post(async (req, res) => {
  try {
    debug("/wishes/list: %O ", req.body);
    var { EventID } = req.body;
    const wishes = await WishDB.findAll({where : {EventID: EventID}})
    debug("/wishes/list response: %O ", wishes);
    
    return res.status(200).json({wishes: wishes});
  } catch (error) {
    debug("/wishes/list error: %O ", error);
    res.status(500).json(error);
  }
});

router.route('/add').post(async (req, res) => {
  try {
    debug("/wishes/add: %O ", req.body);
    const newWish = await WishDB.create(req.body)
    debug("/wishes/add response: %O ", newWish);
    
    return res.status(200).json({id: newWish.WishID});
  } catch (error) {
    debug("/wishes/add error: %O ", error);
    res.status(500).json(error);
  }
});

router.route('/delete').post(async (req, res) => {
  try {
    debug("/wishes/delete: %O ", req.body);
    var { WishID } = req.body;
    await WishDB.destroy({where: {WishID, WishID}});
    return res.status(200).json({});
  } catch (error) {
    debug("/wishes/delete error: %O ", error);
    res.status(500).json(error);
  }
});

router.route('/assign').post(async (req, res) => {
  try {
    debug("/wishes/assign: %O ", req.body);
    var { WishID, username } = req.body;
    await WishDB.update({username, username}, {where: {WishID: WishID}});    
    return res.status(200).json({});
  } catch (error) {
    debug("/wishes/assign error: %O ", error);
    res.status(500).json(error);
  }
});

module.exports = router;