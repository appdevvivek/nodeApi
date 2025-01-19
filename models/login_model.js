//const mongoose = require("mongoose");
const mongooes = require("mongoose");


// Define the Login Schema
const LoginSchema = new mongooes.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
},{ timestamps: true });

// Create and export the Login model
const Login =  mongooes.model("Login", LoginSchema);

module.exports = Login;
