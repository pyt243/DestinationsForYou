var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
router.get("/campgrounds",function(req,res){
Campground.find({},function(err,cgs){
  if(err){
    console.log("error");
  }
  else{
    res.render("campgrounds/index.ejs",{campgrounds:cgs,currentUser:req.user});
  }
 });
});
router.post("/campgrounds",isLoggedIn,function(req,res){
var name  = req.body.name;
var image = req.body.image;
var desc = req.body.description;
var author = {id:req.user._id,username:req.user.username};
var newcamp = {name :name,image :image,description :desc,author:author};
Campground.create(newcamp,function(err,cg){
  if(err){
    console.log("error");
  }
  else{
    console.log("New campground added");
    res.redirect("/campgrounds");
  }
});
});
router.get("/campgrounds/new",isLoggedIn,function(req,res){
  res.render("campgrounds/new.ejs");
});
router.get("/campgrounds/:id",isLoggedIn,function(req,res){
  Campground.findById(req.params.id).populate("comments").exec(function(err,cg){
    if(err){
      console.log(err);
    }
    else{
      console.log(cg);
      res.render("campgrounds/show.ejs",{campground:cg});
    }
  });
});
//EDit and Update================
router.get("/campgrounds/:id/edit",checkOwner,function(req,res){
  Campground.findById(req.params.id,function(err,fg){
    if(err){
      console.log(err);
    }else {
    res.render("campgrounds/edit.ejs",{campground:fg});
  }
  });

});
router.put("/campgrounds/:id",checkOwner,function(req,res){
  Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,uc){
    if(err){
      res.redirect("/campgrounds");
    }else{
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});
router.delete("/campgrounds/:id",checkOwner,function(req,res){
  Campground.findByIdAndRemove(req.params.id,function(err){
    if(err){
      res.redirect("/campgrounds");
    }else {
      res.redirect("/campgrounds");
    }
  });
});
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
  return next();
  }
  else{
    res.redirect("/login");
  }
}
function checkOwner(req,res,next){
  if(req.isAuthenticated()){

    Campground.findById(req.params.id,function(err,fg){
      if(err){
        res.redirect("/campgrounds");
      }else{ if(fg.author.id.toString() == req.user._id){
        next();
      }else{
            res.redirect("back");
           }
      }
   });

  }else{
    res.redirect("back");
  }
}
module.exports = router;
