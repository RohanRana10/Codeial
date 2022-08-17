//create express router 
const express = require('express');
const router = express.Router();

//below are names that import controllers
const homeController = require('../controllers/home_controller');


console.log('router loaded');

//url call pe
router.get('/',homeController.home);
router.use('/users',require('./users'));

router.use('/posts',require('./posts'));

//for any further routes, access from here
//router.use('/routerName',require('./routerFile'));

//exported the router
module.exports = router;