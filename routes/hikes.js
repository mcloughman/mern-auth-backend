const express = require("express");

const {
  createHike,
  getAHike,
  getHikes,
  deleteHike,
  updateHike,
} = require("../controllers/hikeController");

const requireAuth = require("../middleware/requireAuth");
const multer = require("multer");

const { storage } = require("../cloudinary");
const upload = multer({ storage });
const router = express.Router();

// GET all hikes
router.get("/", getHikes);

router.get("/:id", getAHike);

// Strtegically put this middleware below because I don't want to require authorization for get routes
router.use(requireAuth);

// POST a new hike
router.post("/", upload.array("image"), createHike);

// DELETE a <hike></hike>
router.delete("/:id", deleteHike);

// UPDATE a hike
router.patch("/:id", updateHike);

module.exports = router;
