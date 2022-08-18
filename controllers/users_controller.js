const User = require('../models/user');
const passport = require('passport');

module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title: "Profile",
            profile_user: user
        });
    });
}

module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err,user){
            return res.redirect('back');
        });
    }
    else{
        return res.status(401).send('Unauthorised');
    }
}

//reder the sign up page
module.exports.signUp = function(req,res){
    // if below does not allow to go to sign up page after already signed in
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    });
}

//reder the sign in page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title: "Codeial | Sign In"
    });
}

//get the sign up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err,user){
        if(err){
            console.log('error in finding user in signing up');
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in creating user while signing up');
                    return;
                }
                return res.redirect('/users/sign-in');
            });
        }else{
            return res.redirect('back');
        }
    });
}

//sign in and create a session for the user
module.exports.createSession = function(req,res){
    return res.redirect('/');
}

//sign out
module.exports.destroySession = function(req,res,next){
    req.logout(function(err) {
        if(err){ 
        return next(err); 
        }
        res.redirect('/');
    });
    // return res.redirect('/');
}