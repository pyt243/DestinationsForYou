var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Coment = require("./models/comment");
var data = [{name:"Cloud's rest",image:"https://i2-prod.cambridge-news.co.uk/incoming/article12958592.ece/ALTERNATES/s1200/Campsites.jpg",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
            {name:"Lake View",image:"https://www.camping.hr/cmsmedia/katalog/7644/200-njivice.jpg",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
            {name:"Mountain Top",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8uTWGu0KCilaVYy78aDaJ0vGWRsRmHkfFArLXbsqv1xEtWY3",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}];
function seedDB(){
Campground.remove({},function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log("removed campgrounds");
    /*data.forEach(function(cg){
      Campground.create(cg,function(err,campg){
        if(err){
          console.log(err);
        }
        else{
          console.log("new campground added");
          Coment.create({text:"this place is great!!!",author:"Homer"},function(err,comment){
            if(err){
              console.log(err);
            }
            else{
            campg.comments.push(comment);
            campg.save();
            console.log("comment added");
          }
        });
        }
      });
    }); */
  }
});

}
module.exports = seedDB;
