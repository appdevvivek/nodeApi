const Login = require("../models/login_model");


// Get All Details
const getAllDetails = (req, res) => {
  res.status(200).json({ msg: "Here are all the details." });
};



// Login API
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("User email found",email);
    // Check if the user exists
    const user = await Login.findOne({ email });

    console.log("User data found",user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }



    // // Verify password
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    // if (!isPasswordValid) {
    //   return res.status(401).json({ message: "Invalid email or password" });
    // }

    // Successful login
    res.status(200).json({
      message: "Login successful",
      userId: user._id,
      name: user.name,
    });
  } catch (err) {
    res.status(500).json({ message: "Error during login", error: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await Login.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new Login({ email, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully', user: { email: user.email, id: user._id } });
  } catch (error) {
    console.log("Error in CreateUser",error)
    res.status(500).json({ message: 'Error creating user', error });
  }
};
// Export both functions
module.exports = {
  getAllDetails,
  login,
  createUser,
};


