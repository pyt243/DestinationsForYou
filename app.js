var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose  = require("mongoose");
var passport = require("passport");
var localStrategy = require("passport-local");
var User = require("./models/user");
app.use(express.static(__dirname + "/public"));
mongoose.connect("mongodb://localhost/yelp_camp");
var Campground = require("./models/campground");
var Coment = require("./models/comment");
var seedDB = require("./seeds");
var methodoverrride = require("method-override");
var campgroundRoutes = require("./routes/campgrounds");
var commentRoutes = require("./routes/comments");
var indexRoutes = require("./routes/index");
app.use(methodoverrride("_method"));
//seedDB();
app.use(require("express-session")({
  secret:"secret message",
  resave:false,
  saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(bodyParser.urlencoded({extended:true}));
app.listen(4000,"127.0.0.1",function(){
  console.log("server has started!!!");
});
app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  next();
});
app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);
