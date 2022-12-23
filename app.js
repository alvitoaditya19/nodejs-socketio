// import * as socketio from 'socket.io';


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const { Server } = require("socket.io");
// const { createServer } = require("http");

const serverBro = require('http').createServer();
const { Server } = require('socket.io')(serverBro);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// socket IO
const httpServerSocket = createServer(app);

const serverSocket = new Server(httpServerSocket,{
    cors:{
        origin: '*'
    }
})
let timeChange;

const data = [
    {name: 1, x: Math.random() * 10, y: Math.random() * 10 },
    {name: 2, x: Math.random() * 10, y: Math.random() * 10 },
    {name: 3, x: Math.random() * 10, y: Math.random() * 10 },
    {name: 4, x: Math.random() * 10, y: Math.random() * 10 },
    {name: 5, x: Math.random() * 10, y: Math.random() * 10 },
    {name: 6, x: Math.random() * 10, y: Math.random() * 10 },
    // {name: 1, x: '06-09', y: 2.978 },
    // {name: 2, x: '06-10', y: 2.973 },
    // {name: 3, x: '06-12', y: 2.955 },
    // {name: 4, x: '06-11', y: 2.964 },
    // {name: 5, x: '06-13', y: 2.937 },
    // {name: 6, x: '06-14', y: 2.919 },
    // {name: 7, x: '06-15', y: 2.902 },
];

const data2 = [
  {name: 1, x: Math.random() * 10, y: Math.random() * 10 },
  {name: 2, x: Math.random() * 10, y: Math.random() * 10 },
  {name: 3, x: Math.random() * 10, y: Math.random() * 10 },
  {name: 4, x: Math.random() * 10, y: Math.random() * 10 },
  {name: 5, x: Math.random() * 10, y: Math.random() * 10 },
  {name: 6, x: Math.random() * 10, y: Math.random() * 10 },
  // {name: 1, x: '06-09', y: 2.978 },
  // {name: 2, x: '06-10', y: 2.973 },
  // {name: 3, x: '06-12', y: 2.955 },
  // {name: 4, x: '06-11', y: 2.964 },
  // {name: 5, x: '06-13', y: 2.937 },
  // {name: 6, x: '06-14', y: 2.919 },
  // {name: 7, x: '06-15', y: 2.902 },
];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

serverSocket.on("connection", (socket) => {
  console.log("connected")
   if(timeChange) clearInterval(timeChange)

   if(data.length > 5 ){
      data.reverse().pop()
      data.reverse()
   }
   data.push({ name: data[data.length - 1].name + 1, x: Math.random() * 10, y: Math.random() * 10 })

   if(data2.length > 5 ){
    data2.reverse().pop()
    data2.reverse()
 }
 data2.push({ name: data2[data2.length - 1].name + 1, x: Math.random() * 10, y: Math.random() * 10 })
   setInterval(() => socket.emit("message", data), 1000)
   setInterval(() => socket.emit("message2", data2), 1000)

})


httpServerSocket.listen(4000);

module.exports = app;
