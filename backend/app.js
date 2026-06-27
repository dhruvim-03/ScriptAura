const dns = require("dns");
try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (err) {
  console.warn("Could not set custom DNS servers, using system default:", err.message);
}

const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./conn/conn");
connectDB();

const cors = require("cors");
const User = require("./routes/user");
const Books = require("./routes/book");
const Favourite = require("./routes/favourites")
const Cart = require("./routes/cart");
const Order = require("./routes/order");

app.use(express.json({ limit: "5mb" })); 
app.use(
  cors({
   origin: [
  "https://script-aura.vercel.app",
  "https://sprightly-centaur-6e1ca3.netlify.app",
  "http://localhost:5173"
],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "id", "bookid"]
  })
);

// Routes
app.use("/api/v1", User);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);
const PORT = process.env.PORT || 1000; 

app.listen(PORT, () => {
  console.log(`Server Started at port ${PORT}`);
});
