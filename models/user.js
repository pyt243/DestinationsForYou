var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var userscheme = new mongoose.Schema({username:String,password:String});
userscheme.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",userscheme);
