var express = require('express');
var UserDB = require('../models/User')
var router = express.Router();
var debug = require('debug')('routes:user');
const { Op } = require("sequelize");

router.route('/register').post(async (req, res) => {
  try {
    //debug("/register: %O ", req);
    const { username, password } = req.body;
    await UserDB.create({ username: username, password: password })
    return res.status(200).json({'username': username})
  } catch (error) {
    debug("/register error: %O ", error);
    res.status(500).json({'error': error.name});
  }
});

router.route('/login').post(async (req, res) => {
  try {
    //debug("/login: %O ", req);
    const { username, password } = req.body;
    const newUser = await UserDB.findOne({attributes: ['username'], where: { username: username, password: password }})
    debug("Login new user: %O ", newUser.username);
    if ( newUser == null ) {
      res.status(500).json({"error": "invalid username or passsword"});
    }
    else {
      return res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.route('/update').post(async (req, res) => {
  try {
    const { username, password } = req.body;
    debug("/users/update for: %O ", username);
    await UserDB.update({password, password}, {where: {username: username}});    
    return res.status(200).json({});
  } catch (error) {
    res.status(500).json(error);
  }
});

router.route('/search').post(async (req, res) => {
  try {
//    debug("/search: %O ", req);
    var { username } = req.body;
    debug("search %O", username);
    username = "%" + username + "%";
    const users = await UserDB.findAll({attributes: ['username'], where: { username: {[Op.like]: username }}});
    return res.status(200).json({"users": users.map(a => a.username)});
  } catch (error) {
      debug("/search error '%O'", error);
      return res.status(500).json(error);
  }
});

module.exports = router;
