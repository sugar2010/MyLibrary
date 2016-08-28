var MongoClient = require("mongodb").MongoClient;
var Server = require("mongodb").Server;
var database={};
var options = {
  db:{w:1,native_parse:false},
  server: {
    socketOptions: {connectTimeoutMS: 500},
    poolSize: 5,
    auto_reconnect: true
  },
  replSet:{},
  mongos:{}
}

database.connect = function(callback){
  MongoClient.connect("mongodb://wyy:123456@localhost:27017/myLibrary", options,function(err,db){//连接数据库
    if(err){
      console.log("Connection Failed");
    }else{
      callback(db);
    }
  });
}


module.exports = database;