const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const routes = require("./routes/routes");
const connectDB = require("./connectionString")
const app = express();
const PORT = 5001; // Change the port if necessary

connectDB();

app.use(bodyParser.json());


  app.use("/",routes);

  app.use("/api/login",routes);


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

 