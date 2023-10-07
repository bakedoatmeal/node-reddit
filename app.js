// Require Libraries
require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const exphbs = require('express-handlebars');
const checkAuth = require('./middleware/checkAuth');
require('./data/reddit-db')
// App Setup
const app = express();
// Middleware
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkAuth);
app.use(express.static('/public'));

const post = require('./controllers/posts')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);
// Routes

// Start Server

app.listen(3000);

module.exports = app;