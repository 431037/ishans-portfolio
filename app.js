const express = require("express");
const app = express();

const expressLayouts = require("express-ejs-layouts");

// Setting up view engine
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

// Routes
app.use("/", require("./routes/index"));

// Setting port to listen too
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Listening on http://localhost:${PORT}`));
