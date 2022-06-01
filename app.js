// Require Libraries
const express = require('express');
const exphbs = require('express-handlebars');


// App Setup
const app = express();

// Middleware
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Routes

// Start Server

app.get('/', (req, res) => {
  res.render('home')
})

app.listen(3000);