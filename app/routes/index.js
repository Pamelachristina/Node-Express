"use strict";

const express = require('express');
const router = express.Router();

//Import `data.JSON` file
const { projects }  = require('../data/data.json');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { projects });
});


/* GET about page. */
router.get('/about', function(req, res, next) {
    res.render('about');
  });


/* GET projects page. */
router.get('/projects/:id', function(req, res, next) {
    //res.render('project', { project });
    const projectId = req.params.id;
    const project = projects.find( project => project.id === +projectId );
    
    if (project) {
      res.render('project', { project });
    } else {
      const err = new Error();
      err.status = 404;
      err.message = 'Oh Noes! The milk has gone bad. Sorry this page does not exist.';
      next(err);
    } 

  });

  router.get('/error', function(req, res, next)  {
    console.log('Oh Noes! The milk has gone bad. Sorry this page does not exist.');
  
    const err = new Error();
    err.message = 'Oh Noes! The milk has gone bad. Sorry this page does not exist.'
    err.status = 404;

    res.status(404);
    next(err);
});


  
  



module.exports = router;