const mongoose = require("mongoose");


// Define the Login Schema
const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create and export the Login model
const Login =  mongoose.model("Login", LoginSchema);

module.exports = Login;
