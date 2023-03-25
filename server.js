const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const hikeRoutes = require("./routes/hikes");

// express app
const app = express();
// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/hikes", hikeRoutes);
// listen for requests

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected to db and listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
