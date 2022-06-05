var express = require('express');
var InviteDB = require('../models/Invite')
var router = express.Router();
var debug = require('debug')('routes:invites');
const { Op } = require("sequelize");
const sequelize = require("../models/index")

router.route('/list').post(async (req, res) => {
  try {
    debug("/invites/list: %O ", req.body);
    var { EventID } = req.body;
    const invites = await InviteDB.findAll({where : {EventID: EventID}})
    debug("/invites/list response: %O ", invites);
    
    return res.status(200).json({invites: invites});
  } catch (error) {
    debug("/invites/list error: %O ", error);
    res.status(500).json(error);
  }
});

router.route('/add').post(async (req, res) => {
  try {
    debug("/invites/add: %O ", req.body);
    const newInvite = await InviteDB.create(req.body)
    debug("/invites/invite response: %O ", newInvite);
    
    return res.status(200).json({});
  } catch (error) {
    debug("/invites/add error: %O ", error);
    res.status(500).json(error);
  }
});

router.route('/delete').post(async (req, res) => {
  try {
    debug("/invites/delete: %O ", req.body);
    var { EventID, username } = req.body;
    await InviteDB.destroy({where: {
      [Op.and] : [
          {EventID, EventID},
          {username, username}
        ]
      }
    });
    
    return res.status(200).json({});
  } catch (error) {
    debug("/invites/delete error: %O ", error);
    res.status(500).json(error);
  }
});

module.exports = router;