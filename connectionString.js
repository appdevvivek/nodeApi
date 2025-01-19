  ////////////
  const mongoose = require('mongoose');

// Replace with your actual connection string
const mongoURI = "mongodb+srv://vivekkushwah011:4gkN72l0GyLAES71@cluster0.xh2b4.mongodb.net/FastApi?retryWrites=true&w=majority&appName=Cluster0";


const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);  // Exit process with failure
  }
};

module.exports = connectDB;