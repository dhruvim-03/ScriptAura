const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

// Add book to favourites
router.put("/add-book-to-favourite", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    const isBookFavourite = userData.favourites ? userData.favourites.some(fav => fav.toString() === bookid) : false;
    if (isBookFavourite) {
      return res.status(200).json({ message: "Book is already in favourites", });
    }
    await User.findByIdAndUpdate(id,{ $push: { favourites: bookid } });
    return res.status(200).json({ message: "Book added to favourites", });
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Internal Server Error",});
  }
});

// Delete book from favourites
router.delete("/remove-book-from-favourite", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    const isBookFavourite = userData.favourites ? userData.favourites.some(fav => fav.toString() === bookid) : false;
    if (isBookFavourite) {
         await User.findByIdAndUpdate(id,{ $pull: { favourites: bookid } });
    }
    return res.status(200).json({ message: "Book removed from favourites", });
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Internal Server Error",});
  }
});

//Get favourite books of a particular user
router.get("/get-favourite-books", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id).populate("favourites");
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    const favouriteBooks = userData.favourites ? userData.favourites.filter(book => book !== null) : [];
    return res.json({ status:"Success", data : favouriteBooks});
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "An error occurred",});
  }
});
module.exports = router;