// Require Libraries
const express = require('express');
const exphbs = require('express-handlebars');
require('./data/reddit-db')

// App Setup
const app = express();
const post = require('./controllers/posts')(app);
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// Middleware
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Routes

// Start Server

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/posts/new', (req, res) => {
  res.render('posts-new')
})

app.listen(3000);