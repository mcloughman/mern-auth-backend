const express = require("express");

const {
  createHike,
  getAHike,
  getHikes,
  deleteHike,
  updateHike,
} = require("../controllers/hikeController");

const multer = require("multer");

const { storage } = require("../cloudinary");
const upload = multer({ storage });
const router = express.Router();

// GET all hikes
router.get("/", getHikes);

router.get("/:id", getAHike);

// POST a new hike
router.post("/", upload.array("image"), createHike);

// DELETE a <hike></hike>
router.delete("/:id", deleteHike);

// UPDATE a hike
router.patch("/:id", updateHike);

module.exports = router;
