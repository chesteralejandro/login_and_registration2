const routes = require('./routes');
const express = require('express');
const session = require('express-session');
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/assets'));
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'keyboard-kitten',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));
// If you're using router use it after any other app level middlewares
app.use(routes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log("Server listening on port...", PORT));