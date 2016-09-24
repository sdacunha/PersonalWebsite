var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var postCount = req.app.locals.poet.helpers.getPostCount();
    var posts = req.app.locals.poet.helpers.getPosts(0, postCount);
    res.render('blog', { title: "Shadwell's Corner", posts: posts})
});

module.exports = router;