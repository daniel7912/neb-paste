var express = require('express');
var router = express.Router();
var syntaxTypes = require('./includes/syntax-types.json');
var dappAddress;

var env = process.env.NODE_ENV || 'dev';
if (env === 'dev' || env === 'development') {
  dappAddress = 'n1xGxDjVdMaP5Mk5FpCoEK9gGwpsNgW7BUL';
} else {
  dappAddress = 'n1rx5yePFaVy9HA1MTcMqPxYy71h1BxYBLw';
  // TX Hash - 47d3fb7e0c25eddfb6e443496f5a49285cb50894c9f66ba8a3ec00fff61e0c3b
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', syntaxTypes: syntaxTypes, dappAddress: dappAddress });
});

/* GET your pastes page. */
router.get('/your-pastes', function(req, res, next) {
  res.render('your-pastes', { title: 'Your Pastes', dappAddress: dappAddress });
});

/* GET single paste page. */
router.get('/:key', function(req, res, next) {
  res.render('paste', { title: 'Paste', key: req.params.key, dappAddress: dappAddress });
});

module.exports = router;
