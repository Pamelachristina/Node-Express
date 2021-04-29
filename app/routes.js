

const express = require('express');
const router = express.Router();

//Import `data.JSON` file
const projects  = require('/data.json');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


/* GET about page. */
router.get('/about', function(req, res, next) {
    res.render('about');
  });


/* GET projects page. */
router.get('/projects', function(req, res, next) {
    res.render('projects');
  });
  
  



module.exports = router;