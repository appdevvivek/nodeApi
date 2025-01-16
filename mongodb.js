const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");


const app = express();
app.use(bodyParser.json());

// MongoDB Connection
// const mongoURI = "mongodb+srv://vivekkushwah011:4gkN72l0GyLAES71@cluster0.xh2b4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const mongoURI = "mongodb+srv://vivekkushwah011:4gkN72l0GyLAES71@cluster0.xh2b4.mongodb.net/FastApi?retryWrites=true&w=majority&appName=Cluster0";


mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Item Schema and Model
const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
});
const Item = mongoose.model("Item", ItemSchema);

// Product Schema and Model
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  product_qulity: { type: String, required: true },
  product_color: { type: String, required: true },
  quantity: { type: Number, required: true },
});
const Product = mongoose.model("Product", ProductSchema);


// User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

// Signup API
app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: "User created successfully", userId: newUser._id });
  } catch (err) {
    res.status(500).json({ message: "Error creating user", error: err.message });
  }
});


// Login API
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Successful login
    res.status(200).json({ message: "Login successful", userId: user._id, name: user.name });
  } catch (err) {
    res.status(500).json({ message: "Error during login", error: err.message });
  }
});

// Simple Create API (POST)
app.post("/api/items", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ message: "Error creating item", error: err });
  }
});

// Simple Create API (POST)
app.post("/api/products", async (req, res) => {
  try {
    const newProd = new Product(req.body);
    const savedProd= await newProd.save();
    res.status(201).json(savedProd);
  } catch (err) {
    res.status(500).json({ message: "Error creating item", error: err });
  }
});

// Get Item by ID API (GET)
app.get("/api/items/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: "Error fetching item", error: err });
  }
});

const PORT = 5001; // Change the port if necessary
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
