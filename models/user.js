var db = require("./dbconnect.js");
var users = {};

users.getCollection = function(callback){
  db.connect(function(db){
    db.collection("users",function(err,users){//获取数据集
      if(err){
        console.log("获取collection失败");
      }else{
        callback(users);
      }
    });
  })
}


module.exports = users;