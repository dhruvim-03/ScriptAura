const mongoose=require("mongoose");

const user=new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    fullName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    avatar:{
        type: String,
        required: true,
        default:"https://cdn-icons-png.flaticon.com/512/6780/6780628.png"
    },
    role:{
        type: String,
        default:"user",
        enum: ["user","admin"],
    },
    favourites:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "books",
        },
    ],
    cart:[      
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "books",
        },
    ],
    orders:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "order",
        },
    ],
  },{timestamps: true}
);
module.exports=mongoose.model("user",user);