var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    var file = __dirname + '/../resume/Shadwell_Resume.pdf';
    res.download(file); // Set disposition and send it.
});

module.exports = router;
