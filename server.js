/*******************************************************
 * Define some constants and variables
 ********************************************************/
const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const flash = require("express-flash");
const session = require("express-session");
const passport = require("./utils/passport");
const methodOverride = require("method-override");
const routes = require("./routes/routes");
const mongoose = require("mongoose");
const connectDB = require("./utils/dbConnect");
require("dotenv").config();
const port = process.env.PORT || 8000;

connectDB();

/*******************************************************
 * Middleware
 ********************************************************/
app.use(express.static("./public"));

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride("_method"));

/*******************************************************
 * Set template engine
 ********************************************************/
app.set("view engine", "ejs");

/*******************************************************
 * Routes & API
 ********************************************************/
app.use(routes(passport));

/*******************************************************
 * Connect to database & Start webserver
 ******************************************************* */

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () =>
    console.table({
      Running: { Server: true },
      Port: { Server: parseInt(port) },
      Database: { Server: process.env.DB_NAME },
      DBconnection: {
        Server:
          mongoose.connection.readyState === 1 ? "Connected" : "Not connected",
      },
      Url: { Server: process.env.URL },
    })
  );
});
