const {
  Schema,
  model
} = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
    trim:true
  },
   email: {
    type: String,
    required: true,
    unique:true
  },
   password: {
    type: String,
    required: true,
  },
  
},{versionKey:false,timestamps:true});

const User = model("User", userSchema)

module.exports = User