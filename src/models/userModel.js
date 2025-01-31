const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
    enum: ["Mr", "Mrs", "Miss"]
  },
  fullName:{
    type: String,
    required: true
  },
  phoneNumber:{
    type: String,
    required: true,
    unique: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  address:{
    street:{type: String},
    city: {type: String},
    pincode: {type: String}
  }
}, {timestamps: true})

module.exports = mongoose.model("user",userSchema);