var express = require('express');
var UserDB = require('../models/User')
var EventDB = require('../models/Event')
var router = express.Router();

router.route('/').post(async (req, res) => {
    try {
      console.log(req)
      const newEvent = await EventDB.create(req.body)
      res.header("Access-Control-Allow-Origin", "*");
      return res.status(200).json(newEvent)
    

      console.log(res)
    } catch (error) {
      res.status(500).json(error);
    }
  });

module.exports = router;