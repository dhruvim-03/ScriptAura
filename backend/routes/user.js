const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

//SIGN UP

router.post("/sign-up", async (req, res) => {
    console.log(req.body);

    try {
        const { username, fullName, email, password, address, avatar } = req.body;

        // Check full name length
        if (!fullName || fullName.trim().length < 3) {
            return res.status(400).json({
                message: "Full Name must be at least 3 characters long",
            });
        }

        // Check username length
        if (!username || username.length < 4) {
            return res.status(400).json({
                message: "Username length should be greater than 3",
            });
        }

        // Check if username already exists
        const existingUsername = await User.findOne({ username });

        if (existingUsername) {
            return res.status(400).json({
                message: "Username already exists",
            });
        }

        // Check if email already exists
        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({
                message: "Email already exists",
            });
        }

        // Check password length
        if (!password || password.length <= 5) {
            return res.status(400).json({
                message: "Password length should be greater than 5",
            });
        }

        // Hash password
        const hashPass = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            fullName,
            email,
            password: hashPass,
            address,
            ...(avatar && { avatar }),
        });

        await newUser.save();

        return res.status(200).json({
            message: "Sign Up Successful",
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
});

//SIGN IN
router.post("/sign-in", async (req, res) => {
    console.log(req.body);

    try {
        const { username, password } = req.body;

        // Check user exists
        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            return res.status(400).json({
                message: "Invalid Credentials",
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Credentials",
            });
        }

        // Create token
        const authClaims = [
            { name: existingUser.username },
            { role: existingUser.role },
        ];

        const token = jwt.sign(
            { authClaims },
            "bookStore123",
            { expiresIn: "30d" }
        );

        return res.status(200).json({
            id: existingUser._id,
            role: existingUser.role,
            token,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
});

//GET USER INFORMATION
router.get("/get-user-information",authenticateToken,async (req, res) => {
  try{
        const { id } = req.headers;
        const data = await User.findById(id).select('-password');
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error",
      });
    }
}
);

//UPDATE ADDRESS
router.put("/update-address", authenticateToken, async (req, res) => {
  try {
   const {id}=req.headers;
   const {address}=req.body;
   await User.findByIdAndUpdate(id, {address:address});
   return res.status(200).json({message:"Address Updated Successfully"});
  }catch(error){
    res.status(500).json({ message:"Internal server error"});
  }
});
module.exports = router;