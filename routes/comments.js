var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campground");
var Coment = require("../models/comment");
router.get("/campgrounds/:id/comments/new",isLoggedIn,function(req,res){
  Campground.findById(req.params.id,function(err,cg){
    if(err){
      console.log(err);
    }else {
      res.render("comments/new.ejs",{campground:cg});
    }
  });
});
router.post("/campgrounds/:id/comments",isLoggedIn,function(req,res){
  Campground.findById(req.params.id,function(err,cg){
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    }
    else {
      Coment.create(req.body.comment,function(err,comment){
        if(err){
          console.log(err);
        }
        else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          cg.comments.push(comment);
          cg.save(function(err,cg2){
            if(err){
              console.log(err);
            }else{
              res.redirect("/campgrounds/" + cg2.id);
            }
          });
        }
      });
    }
  });
});
/*
router.get("/campgrounds/:id/comments/:comment_id/edit",checkComment,function(req,res){
  Coment.findById(req.params.comment_id,function(err,fc){
    if(err){
      res.redirect("back");
    }else {
      res.render("comments/edit.ejs",{cid:req.params.id,comment:fc});
    }
  });
});
router.put("/campgrounds/:id/comments/:comment_id",checkComment,function(req,res){
  Coment.findByIdAndUpdate(req.params.comment_id,{text:req.body.text},function(err,uc){
    if(err){
      res.redirect("back");
    }else{
      res.redirect("/campgrounds/" + req.params.id )
      }
  });
});*/
router.delete("/campgrounds/:id/comments/:comment_id",checkComment,function(req,res){
  Coment.findByIdAndRemove(req.params.comment_id,function(err){
    if(err){
      console.log("back");
    }else{
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});
router.post("/commentNew",function(req,res){
  var obj = req.body;
  console.log(obj);
  Campground.findById(obj.c_id,function(err,fg){
      if(err){
        redirect("back");
      }else {
        Coment.create({text:obj.text},function(err,fc){
          fc.author.username=obj.currentUser.username;
          fc.author.id=obj.currentUser._id;
          fc.save();
          fg.comments.push(fc);
          fg.save();
          res.send(fc._id);
        });
      }
  });
});
router.post("/commentRemove",function(req,res){
  Coment.findByIdAndRemove(req.body.cid,function(err){
    if(err){
      console.log(err);
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
function checkComment(req,res,next){
  if(req.isAuthenticated()){

    Coment.findById(req.params.comment_id,function(err,fc){
      if(err){
        res.redirect("/campgrounds");
      }else{ if(fc.author.id.toString() == req.user._id){
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
