var express = require('express');
var router = express.Router();
var syntaxTypes = require('./includes/syntax-types.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', syntaxTypes: syntaxTypes });
});

/* GET your pastes page. */
router.get('/your-pastes', function(req, res, next) {
  res.render('your-pastes', { title: 'Your Pastes' });
});

/* GET single paste page. */
router.get('/:key', function(req, res, next) {
  res.render('paste', { title: 'Paste', key: req.params.key });
});

module.exports = router;
