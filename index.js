// require express s1
const express = require('express');
const app = express();

//require express layouts installed s6
const expressLayouts = require('express-ejs-layouts');

//require cookie parser installed s7
const cookieParser = require('cookie-parser');


//require the db
const db = require('./config/mongoose');

//require the express session and for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const passportJWT = require('./config/passport-jwt-strategy');

const passportGoogle = require('./config/passport-google-oauth2-strategy');
//require mongo store
const MongoStore = require('connect-mongo');

//require sassMiddleware
const sassMiddleware = require('node-sass-middleware');

//require flash
const flash = require('connect-flash');

//require our custom middleware
const customMware = require('./config/middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}))

//use the express layouts
app.use(expressLayouts);

//for post requests
app.use(express.urlencoded());

//for cookie parser
app.use(cookieParser());
// make the uploads path available the the browzer
app.use('/uploads',express.static(__dirname + '/uploads'));

//extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use the static files
app.use(express.static('./assets'));



//set view engine ejs s5
app.set('view engine','ejs');
app.set('views','./views');

//mongo store is used to store the session cookie in the db
//use the session
app.use(session({
    name: 'codeial',
    //TODO change the secret before deployment
    secret: 'thisisit',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/codeial_development',
            autoRemove: 'disabled'
        },function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use flash
app.use(flash());
app.use(customMware.setFlash);

//use express router s4
app.use('/',require('./routes/index'));

//create port s2
const port = 8000;

// create port listener s3
app.listen(port,function(err){
    if(err){
        console.log(`Error in runnng the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`)
});
    