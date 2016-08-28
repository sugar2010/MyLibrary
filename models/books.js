var db = require("./dbconnect.js");
var books = {};

books.getCollection = function(callback){
  db.connect(function(db){
    db.collection("bookList",function(err,books){//获取数据集
      if(err){
        console.log("获取collection失败");
      }else{
        callback(books);
      }
    });
  })
}


module.exports = books;