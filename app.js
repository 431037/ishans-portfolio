const express = require("express");
const app = express();

const dotenv = require("dotenv");
const flash = require("connect-flash");

dotenv.config(); // Allows me to use process environment variables

//Authentication
const session = require("express-session");
const passport = require("passport");

// Body parsers
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Db stuff
const mongoose = require("mongoose");
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Setting up view engine
const expressLayouts = require("express-ejs-layouts");

app.set("view engine", "ejs");
app.set("views", __dirname + "/server/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);

// Declaring static paths
app.use(express.static("public"));
app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js")); // redirect bootstrap JS
app.use("/js", express.static(__dirname + "/node_modules/jquery/dist")); // redirect JS jQuery
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css")); // redirect CSS bootstrap
app.use(
  "/fa",
  express.static(__dirname + "/node_modules/@fortawesome/fontawesome-free/")
); // font-awesome

// Setting up sessions
app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
  })
);

app.use(flash());

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Creating a instance of a user model
const userModel = require("./server/models/User");

// Import user model
const User = userModel.User;
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Global variables
app.use(function (req, res, next) {
  res.locals.auth = req.isAuthenticated(); // I use this in-order to show a log in button or log out button on the nav
  next();
});

// Routes
app.use("/", require("./server/routes/index"));
app.use("/client", require("./server/routes/client"));

// Routes that will give us a 404
app.use(function (req, res, next) {
  res.status(404).send(`No root named : ${req.originalUrl}`);
  next();
});

// Setting port to listen too
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Listening on http://localhost:${PORT}`));
