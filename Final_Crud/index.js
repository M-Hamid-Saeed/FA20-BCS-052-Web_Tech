const express = require("express");
const mongoose = require("mongoose");



const PORT = 4000;

let app = express();
let gameModel = require("./models/gameModel");
const isValidated = require("./middleware/validate");

app.use("/public", express.static("public"));
app.use("public/css", express.static("../public"));
app.use(express.json());
app.use(express.urlencoded());
app.set("view engine", "ejs");



app.get("/games", async (req, res) => {
  let games = await gameModel.find();

  res.render("games.ejs", { games });
});

app.get("/add", (req, res) => {
  res.render("add.ejs");
});

app.get("/update/:id", async (req, res) => {
  console.log("in update", req.body);
  try {

    const gameId = req.params.id;
    const game = await gameModel.findById(gameId);

    if (!game) {
      return res.status(404).send("Game not found");
    }

    res.render("update.ejs", { game });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.get("/delete/:id", async (req, res) => {
  try {
    console.log(`Game ID Deletion: ${req.params.id}`);
    let gameToDelete = await gameModel.findByIdAndDelete(req.params.id);
    console.log(`Game Deleted: ${gameToDelete}`);
    res.redirect("/games");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/addGame", isValidated ,async (req, res, next) => {
  try {
    let gameToAdd = new gameModel();
    gameToAdd.title = req.body.title;
    gameToAdd.genre = req.body.genre;
    gameToAdd.time = req.body.time;

    await gameToAdd.save();
    res.redirect("/games");
  } catch (error) {
    next(error);
  }
});
app.post("/updateGame/:id", async (req, res, next) => {
  try {
    const gameId = req.params.id;
    const gameToUpdate = await gameModel.findById(gameId);

    if (!gameToUpdate) {
      return res.status(400).send("Game not found");
    }
    console.log("BODY");
    console.log(req.body);
    gameToUpdate.title = req.body.title;
    gameToUpdate.genre = req.body.genre;
    gameToUpdate.time = req.body.time;
    
    await gameToUpdate.save();

    res.redirect("/games");
  } catch (error) {
   
    next(error);
  }
});

const bcrypt = require("bcryptjs");

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

const MONGODBURL =
  "mongodb+srv://admin:admin@cluster0.jo37mtt.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(MONGODBURL, { useNewUrlParser: true })
  .then(() => console.log("MongoDB: Connected"))
  .catch((error) => console.log(error.message));
