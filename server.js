const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const hikeRoutes = require("./routes/hikes");
const userRoutes = require("./routes/user");

// express app
const app = express();
// middleware
app.use(express.json({ limit: "50mb" }));
app.use((req, res, next) => {
  next();
});

// routes
app.use("/api/hikes", hikeRoutes);
app.use("/api/user", userRoutes);
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
