require('dotenv').config()

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var express_logger = require('morgan');
var http = require('http');
var debug = require('debug')('init');
var db = require('./models/index');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var connRouter = require('./routes/connections')
var eventRouter = require('./routes/events')
var inviteRouter = require('./routes/invites')
var wishRouter = require('./routes/wishes')
var suggestions = require('./routes/suggestions')
var app = express();

app.use(express_logger(process.env.MORGAN));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/connections' , connRouter);
app.use('/events' , eventRouter);
app.use('/invites' , inviteRouter);
app.use('/wishes' , wishRouter);
app.use('/suggestions' , suggestions);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.LISTENING_PORT, () => {
  debug("listening on port %s", process.env.LISTENING_PORT);
})

db.sync().then(() => {
  debug("DB synced")
}).catch((err) => {
  debug("DB sync error: %O", err)
})
