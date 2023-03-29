const Hike = require("../models/hikeModel");
const mongoose = require("mongoose");

// GET all hikes

const getHikes = async (req, res) => {
  // we also want to sort by date when we render the hikes in descending order
  const hikes = await Hike.find({}).sort({ createdAt: -1 });

  // send hikes as json back to the client
  res.status(200).json(hikes);
};

// GET a single hike

const getAHike = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout :(" });
  }
  const hike = await Hike.findById({ _id: id });
  if (!hike) {
    return res.status(404).json({ error: "No such workout!" });
  }
  return res.status(200).json(hike);
};

// CREATE a new hike

const createHike = async (req, res) => {
  const { title, description, rating } = req.body;
  const images = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));

  try {
    const hike = await Hike.create({ title, description, images, rating });
    res.status(200).json(hike);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  console.log(req.body, req.files);
};

// DELETE a hike

const deleteHike = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such hike :(" });
  }
  const hike = await Hike.findOneAndDelete({ _id: id });
  if (!hike) {
    return res.status(404).json({ error: "No such hike!" });
  }
  res.status(200).json(hike);
};

// UPDATE a hike
const updateHike = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such hike :(" });
  }
  const hike = await Hike.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!hike) {
    return res.status(404).json({ error: "No such hike!" });
  }
  res.status(200).json(hike);
};

module.exports = { createHike, getHikes, getAHike, deleteHike, updateHike };
