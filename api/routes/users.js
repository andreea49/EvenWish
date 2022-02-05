var express = require('express');
var UserDB = require('../models/User')
var router = express.Router();

/* GET users listing. */
router.route('/register').post(async (req, res) => {
  try {
    console.log(req)
    const { username, password } = req.body;
    await UserDB.create({ username: username, password: password })
    res.header("Access-Control-Allow-Origin", "*");

    return res.status(200).json(newUser)
  } catch (error) {
    res.status(500).json(error);
  }
});

router.route('/login').post(async (req, res) => {
  try {
    console.log(req)
    const { username, password } = req.body;
    //await UserDB.findOne({ username: username, password: password })
    const newUser = await UserDB.findOne({where: { username: username, password: password }})
    res.header("Access-Control-Allow-Origin", "*");
    //console.log(newUser)
    if ( newUser == null ) {
      res.status(500).json("no username or passsword");
    }
    else {
      return res.status(200).json(newUser)
    }
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;
