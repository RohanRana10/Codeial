// require express s1
const express = require('express');
const app = express();

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
    