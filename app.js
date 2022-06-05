// Require Libraries
const express = require('express');
const exphbs = require('express-handlebars');
require('./data/reddit-db')

// App Setup
const app = express();
// Middleware
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.json())
app.use(express.urlencoded({extended:false}))

const post = require('./controllers/posts')(app);

// Routes

// Start Server


app.get('/posts/new', (req, res) => {
  res.render('posts-new')
})

app.post('/posts/new', (req, res) => {

  console.log(req.body.title)
  const post = new Post(req.body);
  console.log('hello?', post)
  post.save().then(() => res.redirect('/'));
})

app.listen(3000);

module.exports = app;