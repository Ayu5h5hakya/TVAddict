var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    path = require('path'),
    Product = require('./models/product'),
    Cart = require('./models/cart'),
    expressSession = require('express-session'),
    MongoStore = require('connect-mongo')(expressSession),
    passport = require('passport'),
    validator = require('express-validator'),
    request = require('request-promise'),
    API_KEY='83ef7189721a67650fe8f404af8cf6aa';

app = express()
app.listen(3000)
app.use(bodyParser.urlencoded({extended:true}));
app.use(validator());
app.set('view engine','hbs');
app.set('views',path.join(__dirname,'views'));
mongoose.connect('localhost:27017/shopping_database');
require('./config/passport')
app.use(expressSession({
  secret:'AyushShakya',
  resave:false,
  saveUnintialized:false,
  store:new MongoStore({
      mongooseConnection:mongoose.connection
  }),
  cookie:{maxAge:180*60*1000}
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
  res.locals.login = req.isAuthenticated();
  res.locals.session= req.session;
  next();
});
app.get('/',function(req,res,next){
    Product.find(function(err,docs){
      var Productchunks=[];
      var chunksize=3;
      for(var i=0;i<docs.length;i+=chunksize)
      {
        Productchunks.push(docs.slice(i,i+chunksize));
      }
    res.render('shop/index',{title:'Express',products:Productchunks});
  });
})

app.get('/user/signup',function(req,res,next){
  res.render('./user/signup');
});
app.get('/user/signin',function(req,res,next){
  res.render('./user/signin');
});
app.get('/user/profile',isLoggedIn,function(req,res,next){
  res.end('This the profile page');
});
app.get('/user/logout',function(req,res,next){
  res.logout();
  res.redirect('/');
});
app.get('/user/mycart',function(req,res,next){
   if(!req.session.cart){
     return res.render('./user/mycart',{seriesList:null,details:null});
   }
   var cart = new Cart(req.session.cart);
   res.render('./user/mycart',{seriesList:cart.generateArray(),details:null});
});

//
app.get('/addtocart/:id',function(req,res,next) {
  var productid=req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  Product.findById(productid,function(err,product){
    if(err){
      return res.redirect('/');
    }
    else{
      cart.add(product,product.id);
      req.session.cart = cart;
      res.redirect('/');
    }
  });
})
app.get('/show/:title',function(req,res,next){
  var cart = new Cart(req.session.cart),temp,seasonArray=[];
   request({uri:'http://api.tvmaze.com/singlesearch/shows?q='+req.params.title,json:true})
   .then((data)=>{
     temp = data;
     return request({uri:'http://api.tvmaze.com/shows/'+data.id+'/seasons',json:true})
  })
  .then((seasonList) => {
    for(var i =0;i<seasonList.length;++i) seasonArray.push(seasonList[i]);
    return request({uri:'http://api.tvmaze.com/shows/'+temp.id+'/seasons',json:true})
  })
  .then(()=>{
    res.render('./user/mycart',{seriesList:cart.generateArray(),details:temp,imgpath:temp['image'].original,seasons:seasonArray})
  })
  .catch((err)=>{
    console.log(err);
  })
});
app.get('/searchme',function(req,res,next) {
  var names=[];
  var query = req.query.series_name;
  request({uri:'http://api.tvmaze.com/search/shows?q='+query,json:true})
  .then((results)=>{
    var limit;
    if(results.length>=5) limit =5;
    else limit = results.length;
    for(var i=0;i<limit;++i) {
      if(results[i].show.rating.average>5)  names[i] = results[i].show.name;
    }
    res.render('./shop/index',{search_results:names})
  })
  .catch((err)=>{
    console.log(err);
  })
})

app.post('/user/signup',passport.authenticate('local.signup',{
  successRedirect:'/user/profile',
  failureRedirect:'/user/signup'
}));
app.post('/user/signin',passport.authenticate('local.signin',{
  successRedirect:'/user/profile',
  failureRedirect:'/user/signin'
}));

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}
