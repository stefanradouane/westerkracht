/*******************************************************
 * Define some constants and variables
 ********************************************************/

const express = require("express");
let ejs = require("ejs");

const arrayify = require("array-back");
var bodyParser = require("body-parser");

// const fetch = require("node-fetch");

const dotenv = require("dotenv").config();

const {
	MongoClient,
	ObjectId
} = require("mongodb");

const app = express();
const port = process.env.PORT || 8000;

const bcrypt = require("bcrypt");
const flash = require("express-flash");
const session = require("express-session");

const passport = require("passport");

const methodOverride = require("method-override");

// const inizializePassport = require("./passport-config");

// const user = require("./passport-config");

const {
	use
} = require("passport");

// const toplist = require("./apifallback");

// let db = null;
// const myDatabase = process.env.DB_COLLECTION;
// const dbLijst = process.env.DB_COLLECTION_TWO;


const routes = require('./routes/routes');


// inizializePassport(
// 	passport,
// 	async (email) =>
// 		await db.collection(myDatabase).findOne({
// 			email: email,
// 		}),
// 	(id) => {
// 		const userFound = "true";
// 		return userFound;
// 	}
// );

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

// app.use(flash());
// app.use(
// 	session({
// 		secret: process.env.SESSION_SECRET,
// 		resave: false,
// 		saveUnitialized: false,
// 	})
// );

// app.use(passport.initialize());
// app.use(passport.session());

app.use(methodOverride("_method"));

// function checkAuthenticated(req, res, next) {
// 	if (req.isAuthenticated()) {
// 		return next();
// 	}

// 	res.redirect("/login");
// }

// function checkNotAuthenticated(req, res, next) {
// 	if (req.isAuthenticated()) {
// 		return res.redirect("/");
// 	}
// 	next();
// }

// app.delete("/logout", function (req, res, next) {
// 	req.logout(function (err) {
// 		if (err) {
// 			return next(err);
// 		}
// 		res.redirect("/login");
// 	});
// });

/*******************************************************
 * Set template engine
 ********************************************************/
app.set("view engine", "ejs");

/*******************************************************
 * Routes
 ********************************************************/
app.use(routes);


// app.get("/", async (req, res) => {
// 	// const query = {
// 	// 	_id: ObjectId(req.session.passport.user),
// 	// };
// 	// const options = {
// 	// 	projection: {
// 	// 		_id: 0,
// 	// 		name: 1,
// 	// 	},
// 	// };
// 	// const username = await db.collection(myDatabase).findOne(query, options);
// 	// const naam = username.name;
// 	// res.render("pages/index", {
// 	// 	naam,
// 	// });

// 	res.send("HELLO WESTERKRACHT");
// });

// app.get("/inschrijven", async (req, res) => {
// const query = {
// 	_id: ObjectId(req.session.passport.user),
// };
// const options = {
// 	projection: {
// 		_id: 0,
// 		name: 1,
// 	},
// };
// const username = await db.collection(myDatabase).findOne(query, options);
// const naam = username.name;
// res.render("pages/index", {
// 	naam,
// 	// });

// 	res.send("Jij wilt je sws laten inschrijven");
// });

/*******************************************************
 * If no routes give response, show 404
 ********************************************************/
app.use((req, res) => {
	res.status(404).send("Error 404: Pagina niet gevonden");
});

/*******************************************************
 * Connect to database
 ********************************************************/
// async function connectDB() {
// 	const uri = process.env.DB_URI;
// 	const client = new MongoClient(uri, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	});
// 	try {
// 		await client.connect();
// 		db = client.db(process.env.DB_NAME);
// 	} catch (error) {
// 		throw error;
// 	}
// }

/*******************************************************
 * Start webserver
 ********************************************************/
app.listen(port, () => {
	console.log("+/================================================/+\n\n");
	console.log(`Webserver lisening on port ${port}\n`);
	// connectDB().then(console.log("We have connection to mongoDB\n\n"));
	console.log("+/================================================/+\n\n");
});