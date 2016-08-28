var express = require('express');
var router = express.Router();
var user = require("../controller/user.js");
var book = require("../controller/book.js");


router.post("/register",user.create);

router.post("/login",user.login);

router.post("/booklist",book.addBook);

router.get("/booklist",book.getBookList);

router.post("/booklist/:book_id",book.updateBookList);

router.get("/booklist/:book_id",book.getBookItem);

module.exports = router;
