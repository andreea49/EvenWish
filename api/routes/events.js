var express = require('express');
var InviteDB = require('../models/Invite')
var EventDB = require('../models/Event')
var router = express.Router();
var debug = require('debug')('routes:events');
const { Op } = require("sequelize");
const sequelize = require("../models/index")

router.route('/list').post(async (req, res) => {
  try {
    var { username } = req.body;
    debug("/events/list for %O", username);
    const myEvents = await EventDB.findAll({where: { username: username }});
    debug("/events/list mine %O", myEvents);
    const [results, metadata] = await InviteDB.getEventsForUser(username);
    debug("/events/list theirs %O", results);

    return res.status(200).json({mine: myEvents, theirs: results});
  } catch (error) {
    debug("/events/list error: %O ", error);
    res.status(500).json(error);
  }
});

router.route('/add').post(async (req, res) => {
  try {
    debug("/events/add: %O ", req.body);
    const newEvent = await EventDB.create(req.body)
    debug("/events response: %O ", newEvent);
    
    return res.status(200).json({EventID: newEvent.EventID});
  } catch (error) {
    debug("/events/add error: %O ", error);
    res.status(500).json(error);
  }
});

router.route('/remove').post(async (req, res) => {
  try {
    debug("/events/remove: %O ", req.body);
    var { EventID } = req.body;
    await EventDB.destroy({ where: {EventID: EventID} });
    return res.status(200).json({});
  } catch (error) {
    debug("/events/remove error: %O ", error);
    res.status(500).json(error);
  }
});

module.exports = router;