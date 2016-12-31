var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('home', {});
});

router.get('/rabbit', function (req, res, next) {
  res.render('rabbit', {});
});

router.get('/home', function (req, res, next) {
  res.render('home', {});
});
router.get('/contact', function (req, res, next) {
  res.render('contact', {});
});


module.exports = router;
