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
require('./controllers/comments.js')(app);

// Routes

// Start Server

app.listen(3000);

module.exports = app;