"use strict";

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debug = require('debug')('app:server');
const http = require('http');

//const indexRouter = require('./routes/index');
const app = express();


//app.use('/', indexRouter);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));



//Import `data.JSON` file
 //const data  = require('./data.json').data;
 //const projects = data.projects;
 const { projects }  = require('./data.json');


/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', { projects });
});


/* GET about page. */
app.get('/about', function(req, res, next) {
    res.render('about');
  });


/* GET projects page. */
app.get('/projects/:id', function(req, res, next) {
    //res.render('project', { project });
    const projectId = req.params.id;
    const project = projects.find( project => project.id === +projectId );
    
    if (project) {
      res.render('project', { project });
    } else {
      const err = new Error();
      err.status = 404;
      //console.log(err.message);
      next(err);
    } 

  });

  app.get('/error', function(req, res, next)  {
  
    const err = new Error();
    err.message = 'Oh Noes! The milk has gone bad. Sorry this page does not exist.'
    err.status = 500;

    res.status(500);
    next(err);
});



// catch 404 and forward to error handler
 app.use(function(req, res, next) {
console.log('404 error handler called')
const err = new Error();
err.status = 404;
next(err);
  
}); 



// global error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};

  if(err.status === 404 ){
    err.message = 'Oh Noes! The milk has gone bad. Sorry this page does not exist.';
    console.log(err.message);
    res.status(err.status);
    return res.render('error', { err });

  } else {
    err.message = 'Sorry this page does not exist.';
    console.log(err.message);
    return res.status(err.status || 500).render('error', { err });
  }
 
  
});












/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


module.exports = app;
