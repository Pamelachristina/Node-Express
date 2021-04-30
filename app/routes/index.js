

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
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => project.id === +projectId );
    
    if (project) {
      res.render('project', { project });
    } else {
      res.sendStatus(404);
    }
  });


  
  



module.exports = router;