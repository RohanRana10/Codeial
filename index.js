// require express s1
const express = require('express');
const app = express();

//require express layouts installed s6
const expressLayouts = require('express-ejs-layouts');

//use the express layouts
app.use(expressLayouts);

//extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use the static files
app.use(express.static('./assets'));

//use express router s4
app.use('/',require('./routes/index'));

//set view engine ejs s5
app.set('view engine','ejs');
app.set('views','./views');

//create port s2
const port = 8000;

// create port listener s3
app.listen(port,function(err){
    if(err){
        console.log(`Error in runnng the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`)
});
    