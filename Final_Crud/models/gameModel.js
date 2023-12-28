const mongoose = require("mongoose");

let gameModel = mongoose.Schema(
  {
    title: String,
    genre: [String],
    time: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("GameModel", gameModel);
