const express = require("express");
const Hike = require("../models/hikeModel");
const {
  createHike,
  getAHike,
  getHikes,
  deleteHike,
  updateHike,
} = require("../controllers/hikeController");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

// GET all hikes
router.get("/", getHikes);

router.get("/:id", getAHike);

// POST a new hike
router.post("/", createHike);

// DELETE a <hike></hike>
router.delete("/:id", deleteHike);

// UPDATE a hike
router.patch("/:id", updateHike);

module.exports = router;
