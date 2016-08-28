var users = require("../models/user.js");

module.exports.create=function(req,res){
  var data = {
    username:req.body.username,
    password:req.body.password,
    stuNum:req.body.stuNum,
    name:req.body.name,
    role:"admin",
    grade:req.body.grade
  }
  
  users.getCollection(function(users){
    users.find({username:data.username},function(err,items){//查找用户名是否存在
      items.toArray(function(err,itemArr){
        console.log(itemArr);
        if(itemArr.length>0){
          res.status(400).json({error:"该用户已被注册"});
        }else{
          users.insert(data,function(err,result){
            if(!err){
                console.log("Inserted Successful");
                res.status(200).json(result.ops);
            }else{
                console.log("插入数据出错："+err);
            }
          });
        }
      });
    });
  })
}

module.exports.login=function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  if(!username||!password){
    res.status(400).json({error:"用户名或密码不能为空"});
  }
  users.getCollection(function(users){
    users.find({username:username,password:password},function(err,items){//查找用户名是否存在
      items.toArray(function(err,itemArr){
        if(itemArr.length===0){
          res.status(400).json({error:"用户名或密码错误"});
        }else{
          res.status(200).json({ok:true});
        }
      });
    });
  })
}