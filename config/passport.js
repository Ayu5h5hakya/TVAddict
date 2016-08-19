var passport = require('passport');
var User = require('../models/user');
var localStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user,done){
  done(null,user.id);
});

passport.deserializeUser(function(id,done){
  User.findById(id,function(err,user){
    done(err,user);
  });
});

passport.use('local.signup',new localStrategy({
  usernameField:'email',
  passwordField:'password',
  passReqToCallback:true
},function(req,email,password,done){
  req.checkBody('email','Invalid email').notEmpty().isEmail();
  req.checkBody('email','Invalid password').notEmpty().isLength({min:6});
  var errors = req.validationErrors();
  User.findOne({'email':email},function(err,user){
    if(err){
      return done(err);
    }
    if(user){
      return done(null,false,{message:'Email was already existing'});
    }
    var newUser = new User();
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
    newUser.save(function(err,result){
      if(err){
        console.log(err);
        return done(err);
      }
      return done(null,newUser);
    });
  });
}));

passport.use('local.signin',new localStrategy({
  usernameField:'email',
  passwordField:'password',
  passReqToCallback:true
},function(req,email,password,done){
  req.checkBody('email','Invalid email').notEmpty().isEmail();
  req.checkBody('email','Invalid password').notEmpty().isLength({min:6});
  var errors = req.validationErrors();
  User.findOne({'email':email},function(err,user){
    if(err){
      return done(err);
    }
    if(!user){
      return done(null,false,{message:'No user'});
    }
    if(!user.validatePassword(password)){
      return done(null,false,{message:'No password'});
    }
    return done(null,user);
  });
}));
