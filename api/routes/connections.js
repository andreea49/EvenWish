var express = require('express');
var ConnDB = require('../models/Connection')
var ConnReqDB = require('../models/ConnectionReq')
var router = express.Router();
var debug = require('debug')('routes:connection');
const { Op } = require("sequelize");
const sequelize = require("sequelize");

router.route('/list').post(async (req, res) => {
  try {
    var { username } = req.body;
    debug("conn list for %O", username);
    const users1 = await ConnDB.findAll({attributes: ['User1'], where: { User2: username }});
    return res.status(200).json({"users": users1.map(a => a.User1)});
  } catch (error) {
      debug("/conn list error '%O'", error);
      return res.status(500).json(error);
  }
});

router.route('/unfriend').post(async (req, res) => {
  try {
    var { Sender, Friend } = req.body;
    debug("/unfriend %s -> %s", Sender, Friend);
    await ConnDB.destroy({ where: {User1: Sender, User2: Friend} })
    await ConnDB.destroy({ where: {User1: Friend, User2: Sender} })
    return res.status(200).json({});
  } catch (error) {
      debug("/unfriend error '%O'", error);
      return res.status(500).json(error);
  }
});

router.route('/reqs').post(async (req, res) => {
  try {
    var { username } = req.body;
    debug("/reqs for %O", username);
    const received = await ConnReqDB.findAll({attributes: ['Sender'], where: { Receiver: username }});
    const sent = await ConnReqDB.findAll({attributes: ['Receiver'], where: { Sender: username }});
    return res.status(200).json({"sent": sent.map(a => a.Receiver), "received": received.map(a => a.Sender)});
  } catch (error) {
      debug("/reqssent error '%O'", error);
      return res.status(500).json(error);
  }
});

router.route('/reqsend').post(async (req, res) => {
  try {
    var { Sender, Receiver } = req.body;
    debug("/reqsend %s -> %s", Sender, Receiver);
    await ConnReqDB.create({ Sender: Sender, Receiver: Receiver, Date: sequelize.literal('CURRENT_TIMESTAMP') })
    return res.status(200).json({});
  } catch (error) {
      debug("/reqsend error '%O'", error);
      return res.status(500).json(error);
  }
});

router.route('/reqwithdraw').post(async (req, res) => {
  try {
    var { Sender, Receiver } = req.body;
    debug("/reqwithdraw %s -> %s", Sender, Receiver);
    await ConnReqDB.destroy({ where: {Sender: Sender, Receiver, Receiver} })
    return res.status(200).json({});
  } catch (error) {
      debug("/reqwithdraw '%O'", error);
      return res.status(500).json(error);
  }
});

router.route('/reqaccept').post(async (req, res) => {
  try {
    var { Sender, Receiver } = req.body;
    debug("/reqaccept %s -> %s", Sender, Receiver);
    await ConnReqDB.destroy({ where: {Sender: Sender, Receiver, Receiver} });
    var now = sequelize.literal('CURRENT_TIMESTAMP');
    await ConnDB.create({ User1: Sender, User2: Receiver, Date: now })
    await ConnDB.create({ User1: Receiver, User2: Sender, Date: now })
    return res.status(200).json({});
  } catch (error) {
      debug("/reqaccept '%O'", error);
      return res.status(500).json(error);
  }
});

router.route('/reqreject').post(async (req, res) => {
  try {
    var { Sender, Receiver } = req.body;
    debug("/reqreject %s -> %s", Sender, Receiver);
    await ConnReqDB.destroy({ where: {Sender: Sender, Receiver, Receiver} })
    return res.status(200).json({});
  } catch (error) {
      debug("/reqreject '%O'", error);
      return res.status(500).json(error);
  }
});

module.exports = router;
