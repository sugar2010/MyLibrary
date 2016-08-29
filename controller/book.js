var books = require("../models/books.js");
var shortid = require("shortid");

module.exports.addBook=function(req,res){ 
  var data = {
    book_id:shortid.generate(),
    name:req.body.name,
    publisher:req.body.publisher,
    publishAt:req.body.publishAt,
    author:req.body.author,
    ISBN:req.body.ISBN,
    callNum:req.body.callNum,
    borrowers:[],
    total_num:req.body.total,
    out_num:0
  }
  
  books.getCollection(function(bookList){
    bookList.insert(data,function(err,result){
      if(!err){
          console.log("Inserted Successful");
          res.status(200).json(result.ops);
      }else{
          console.log("插入数据出错："+err);
      }
    });
  });
}

module.exports.getBookList=function(req,res){
  books.getCollection(function(bookList){
    bookList.find(function(err,items){
      if(err){res.status(400).json({error:err})}else{
        items.toArray(function(err,itemArr){
          res.setHeader("Access-Control-Allow-Origin","*");
          res.status(200).json(itemArr);
        });
      }
    })
  });
}

module.exports.updateBookList=function(req,res){
  var data = {
    name:req.body.name,
    publisher:req.body.publisher,
    publishAt:req.body.publishAt,
    author:req.body.author,
    ISBN:req.body.ISBN,
    callNum:req.body.callNum,
    borrowers:[],
    total_num:req.body.total,
    out_num:0
  }
  var book_id = req.params.book_id;
  books.getCollection(function(bookList){
    bookList.update({book_id:book_id},{$set:data},{upsert:false,multi:false},function(err,items){
      if(err){res.status(400).json({error:err})}else{
        res.status(200).json(items);
      }
    });
  });      
}

module.exports.getBookItem=function(req,res){
  var book_id = req.params.book_id;
  books.getCollection(function(bookList){
    bookList.find({book_id:book_id},function(err,items){
      if(err){res.status(400).json({error:err})}else{
        items.toArray(function(err,itemArr){
          res.status(200).json(itemArr[0]);
        });
      }
    })
  });
}
