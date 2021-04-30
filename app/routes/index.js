"use strict";

const express = require('express');
const router = express.Router();

//Import `data.JSON` file
const { projects }  = require('../data/data.json');
const projects = data.projects; 


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


  
  



module.exports = router;