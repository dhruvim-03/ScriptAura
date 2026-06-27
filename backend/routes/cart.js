const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");


//PUT BOOK TO CART
router.put("/add-to-cart", authenticateToken, async (req, res) => {
    try{
        const {bookid, id}=req.headers;
        const userdata=await User.findById(id);
        if (!userdata) {
            return res.status(404).json({ message: "User not found" });
        }
        const isBookinCart = userdata.cart ? userdata.cart.some(item => item.toString() === bookid) : false;
        if(isBookinCart)
        {
            return res.json({status:"Success", message:"Book is already in the cart"});
        }
        await User.findByIdAndUpdate(id,{
            $push: {cart: bookid},
        });
        return res.json({status:"Success", message:"Book added to cart",});
    }   catch(error){
        console.log(error);
        return res.status(500).json({ message:"An error occurred"});
    }
});

//REMOVE BOOK FROM CART
router.put("/remove-from-cart/:bookid", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.params;
        const{id}=req.headers;
        await User.findByIdAndUpdate(id,{ $pull: { cart: bookid }, });
        return res.json({status: "Success",message: "Book removed from the cart",});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred",
        });
    }
});

//GET CART OF A PARTICULAR USER
router.get("/get-user-cart", authenticateToken, async (req, res) => {
    try {
        const{id}=req.headers;
        const userData= await User.findById(id).populate("cart");
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }
        const cart = userData.cart ? userData.cart.filter(item => item !== null).reverse() : [];

        return res.json({status: "Success",data: cart, });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred",
        });
    }
});

module.exports=router;