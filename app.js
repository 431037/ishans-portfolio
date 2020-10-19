const express = require("express");
const app = express();

//Auth
const session = require("express-session");
const passport = require("passport");

// Strategies
const passportLocal = require("passport-local");

const flash = require("connect-flash");

const userModel = require("./models/User");

// Connect to db
const mongoose = require("mongoose");

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Setting up view engine
const expressLayouts = require("express-ejs-layouts");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
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

//////////////////

// Sessions
const secret = require("./config/keys").secret;
app.use(
  session({
    secret: "secret",
    saveUninitialized: false,
    resave: false,
  })
);

app.use(flash());

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Import user model
const User = userModel.User;
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

///////////////

// Global variables
app.use(function (req, res, next) {
  res.locals.auth = req.isAuthenticated();
  next();
});

// Routes
app.use("/", require("./routes/index"));
app.use("/client", require("./routes/client"));

// Setting port to listen too
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Listening on http://localhost:${PORT}`));
