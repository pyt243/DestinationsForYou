var mongoose = require("mongoose");
var campscheme = new mongoose.Schema({name:String,
                                     image:String,
                                     description:String,
                                     comments:[{
                                       type:mongoose.Schema.Types.ObjectId,
                                       ref:"Coment"
                                     }],
                                     author:{
                                       id:{
                                         type:mongoose.Schema.Types.ObjectId,
                                         ref:"User"
                                       },
                                       username:String
                                     }});
module.exports = mongoose.model("Campground",campscheme);
