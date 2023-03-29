const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hikeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    images: {
      type: [{ url: String, filename: String }],
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hike", hikeSchema);
