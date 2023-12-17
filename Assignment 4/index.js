const express = require("express");
const mongoose = require("mongoose");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/css/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
const PORT = 4000;
const isAuthenticated = require("./middleware/verify");
const session = require("express-session");

let app = express();
let gameModel = require("./models/gameModel");
const Registration = require('./models/Registration');
let User = require("./models/user");

app.use("/public", express.static("public"));
app.use("public/css", express.static("../public"));
app.use(express.json());
app.use(express.urlencoded());
app.set("view engine", "ejs");
app.use(
  session({
    secret: "thisissecret",
    resave: false,
    saveUninitialized: true,
  })
);

// Basic Express Translation =====================================================================

app.get("/", (req, res) => {
  console.log("Rendering and Sending 'Login Page'");
  res.render("landingPage");
});

app.get("/register", (req, res) => {
  console.log("Rendering and Sending 'Login Page'");
  res.render("signup");
});

app.get("/home", (req, res) => {
  console.log("Rendering and Sending 'Landing Page'");
  res.render("landingPage");
});

app.get("/services", async (req, res) => {
  try {
    // Fetch tournament details from the database
    const tournaments = await gameModel.find();

    // Render the "servicesPage" template and pass the tournament data
    res.render("servicesPage", { tournaments });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});


app.get("/games", isAuthenticated, async (req, res) => {
  try {
    // Fetch all games
    const games = await gameModel.find();

    // Fetch and populate the count of registered users for each game
    for (const game of games) {
      const registeredUsersCount = await Registration.countDocuments({ tournamentId: game._id });
      game.registeredUsersCount = registeredUsersCount;
    }

    res.render("games.ejs", { games });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/update/:id", async (req, res) => {
  console.log("in update", req.body);
  try {
    // Extract the game ID from the route parameter
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

// ==============================================================================================

// GAME CRUD ====================================================================================

app.get("/delete:id", async (req, res) => {
  console.log(`Game ID Deletion: ${{ _id: req.params.id.split(":")[1] }}`);
  let gameToDelete = await gameModel.findByIdAndDelete({
    _id: req.params.id.split(":")[1],
  });
  console.log(`Game Deleted: ${gameToDelete}`);
  res.redirect("/games");
});

app.get("/add", (req, res) => {
  res.render("add.ejs");
});

app.post("/addGame", upload.single("image"), async (req, res, next) => {
  try {
    // Create a new game instance
    let gameToAdd = new gameModel();
    gameToAdd.title = req.body.title;
    gameToAdd.genre = req.body.genre;
    gameToAdd.date = req.body.date;
    gameToAdd.time = req.body.time;

    // Check if an image file was uploaded
    if (req.file) {
      gameToAdd.image = "public/css/uploads/" + req.file.filename;
      console.log("Image name ", req.file.filename);
    }

    // Save the game to the database
    await gameToAdd.save();

    res.redirect("/games");
  } catch (error) {
    // Handle errors here
    next(error);
  }
});
app.post("/updateGame/:id", upload.single("image"), async (req, res, next) => {
  try {
    const gameId = req.params.id;
    const gameToUpdate = await gameModel.findById(gameId);

    if (!gameToUpdate) {
      return res.status(404).send("Game not found");
    }

    // Update the game fields based on the submitted form data
    gameToUpdate.title = req.body.title;
    gameToUpdate.genre = req.body.genre;
    gameToUpdate.date = req.body.date;
    gameToUpdate.time = req.body.time;

    // Check if an image file was uploaded
    if (req.file) {
      gameToUpdate.image = "public/css/uploads/" + req.file.filename;
      console.log("Image name ", req.file.filename);
    }

    // Save the updated game to the database
    await gameToUpdate.save();

    res.redirect("/games");
  } catch (error) {
    // Handle errors here
    next(error);
  }
});
//REGISTERATION FOR TORUNAMENT
app.post('/register-tournament', async (req, res) => {
  try {
    const { tournamentId, name, email } = req.body;
    console.log("IN THE TOURNAMENT");
    // Check if the email is already registered
    const existingRegistration = await Registration.findOne({ email });
    if (existingRegistration) {
      return res.status(400).json({ status: 'error', message: 'Email already registered for this tournament.' });
    }

    // Save the registration data
    const registration = new Registration({ tournamentId, name, email });
    await registration.save();

    res.status(201).json({ status: 'success', message: 'Registration successful!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});



// ================================================================================================

// User CRUD ======================================================================================
//
// app.post("/register", async (req, res) => {
// let user = await User.find({ email: req.body.email });
app.post("/register", async (req, res) => {
  // let user = await User.find({ email: req.body.email });
  // console.log(user);
  // if (user?) return console.log("User with given email already exists");
  // else {
  let user = new User(req.body);
  // const salt = await bcrypt.genSalt(10);
  user.name = req.body.email;
  user.password = req.body.password;
  console.log("user");
  await user.save();
  res.redirect("/");
  // }
});

// if (user) return console.log("User with given email already exists");

//   console.log(req.body);
//   let userToRegister = new User();
//   userToRegister.name = req.body.name;
//   userToRegister.email = req.body.email;
//   userToRegister.password = req.body.password;
//   await userToRegister.save();
//   res.redirect("/");
// });
const bcrypt = require("bcryptjs");

// app.post("/register", async (req, res) => {
//   console.log(req.body);
//   let user = new User(req.body);
//   const salt = await bcrypt.genSalt(10);
//   user.password = await bcrypt.hash(req.body.password, salt);
//   await user.save();
//   res.redirect("/");
// });

// =================================================================================================

// user authentication ============================================================================

// const User = require("../models/user");

app.get("/logout-user", async (req, res) => {
  req.session.user = null;
  console.log("session clear");
  return res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  console.log("req.body", req.body);
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    console.log("User donot exist");
    // req.session.user = user;
    // req.session.flash = { type: "danger", message: "User Not Present" };
    // req.flash("danger", "User with this email not present");
    return res.redirect("/login");
  } else {
    console.log("User exist", user);
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (validPassword) {
      req.session.user = user;
      // req.flash("success", "Logged in Successfully");
      return res.redirect("/games");
    } else {
      // req.flash("danger", "Invalid Password");
      return res.redirect("/");
    }
  }
});

// =========================================================================================

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

const MONGODBURL =
  "mongodb+srv://admin:admin@cluster0.jo37mtt.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(MONGODBURL, { useNewUrlParser: true })
  .then(() => console.log("MongoDB: Connected"))
  .catch((error) => console.log(error.message));
