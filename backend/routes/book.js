const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

// add book - admin only
router.post("/add-book", authenticateToken, async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.headers;
    const user = await User.findById(id);

    // check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // check admin role
    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You don't have access to admin work" });
    }

    // create book
    const book = new Book({
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
      genre: req.body.genre,
    });
    await book.save();
    return res.status(200).json({
      message: "Book added successfully"});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//UPDATE BOOK - ADMIN
router.put("/update-book", authenticateToken, async (req, res) => {
  try {
    const { id, bookid } = req.headers;

    const user = await User.findById(id);

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You don't have access to admin work" });
    }

    await Book.findByIdAndUpdate(bookid, {
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
      genre: req.body.genre,
    });

    return res.status(200).json({
      message: "Book updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred",
    });
  }
});

//DELETE BOOK-ADMIN
router.delete("/delete-book", authenticateToken, async (req, res) => {
  try {
    console.log("Headers:", req.headers);
    console.log("Book ID:", req.headers.bookid);
    const { id, bookid } = req.headers;
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You don't have access to admin work" });
    }
    await Book.findByIdAndDelete(bookid);
    return res.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred",
    });
  }
});

//GET ALL BOOKS
router.get("/get-all-books", async (req, res) => {
   try{
    const books= await Book.find().sort({createdAt : -1});
     return res.json({
          status: "Success",
          data: books,
     });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
});

//GET RECENTLY ADDED BOOKS
router.get("/get-recent-books", async (req, res) => {
   try{
    const books= await Book.find().sort({createdAt : -1});
     return res.json({
          status: "Success",
          data: books,
     });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
});

//GET BOOK BY ID
router.get("/get-book-by-id/:id", async (req, res) => {
   try{
    const {id}=req.params;
    const book=await Book.findById(id);
     return res.json({
          status: "Success",
          data: book,
     });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});
module.exports = router;