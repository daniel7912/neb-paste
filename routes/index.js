var express = require('express');
var router = express.Router();
var syntaxTypes = require('./includes/syntax-types.json');
var dappAddress;

var env = process.env.NODE_ENV || 'dev';
if (env === 'dev' || env === 'development') {
  dappAddress = 'n1xGxDjVdMaP5Mk5FpCoEK9gGwpsNgW7BUL';
} else {
  dappAddress = 'n1qiDxiZDFRZFG2ezppoP1paniwUz4NGyAB';
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
