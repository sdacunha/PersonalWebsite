express = require('express')
path = require('path')
favicon = require('serve-favicon')
logger = require('morgan')
cookieParser = require('cookie-parser')
bodyParser = require('body-parser')
index = require('./routes/index')
blog = require('./routes/blog')
projects = require('./routes/projects')
resume = require('./routes/resume')
Poet = require('poet');
app = express()
ECT = require('ect');
ectRenderer = ECT({ watch: true, root: __dirname + '/views', ext : '.ect' });

poet = Poet(app, {
  posts: './_posts/',
  postsPerPage: 5,
  metaFormat: 'json',
  readMoreTag: '<!--more-->',
  readMoreLink: (post) -> return '',
  routes: {
    '/posts/:post': 'post',
  }
});

poet.addRoute '/posts/:post', (req, res) ->
  post = poet.helpers.getPost(req.params.post)
  if post
    res.render 'post', post: post, renderBack: true, backUrl: '/blog'
  else
    res.send 404
  return

# view engine setup
app.set 'views', path.join(__dirname, 'views')
app.set 'view engine', 'ect'
app.engine 'ect', ectRenderer.render

poet.watch(() -> Poet::clearCache);
poet.init();

app.locals.poet = poet;

# uncomment after placing your favicon in /public
#app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use logger('dev')
app.use bodyParser.json()
app.use bodyParser.urlencoded(extended: false)
app.use cookieParser()
app.use require('node-sass-middleware')(
  src: path.join(__dirname, 'public')
  dest: path.join(__dirname, 'public')
  indentedSyntax: true
  sourceMap: true)
app.use express.static(path.join(__dirname, 'public'))

app.use '/', index
app.use '/blog', blog
app.use '/resume', resume
app.use '/projects', projects

# catch 404 and forward to error handler
app.use (req, res, next) ->
  err = new Error('Not Found')
  err.status = 404
  next err
  return


# error handlers
# development error handler
# will print stacktrace
if app.get('env') == 'development'
  app.use (err, req, res, next) ->
    res.status err.status or 500
    res.render 'error',
      message: err.message
      error: err
    return

# production error handler
# no stacktraces leaked to user
app.use (err, req, res, next) ->
  res.status err.status or 500
  res.render 'error',
    message: err.message
    error: {}
  return
module.exports = app
