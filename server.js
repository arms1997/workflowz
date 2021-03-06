// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const path       = require('path');
const cookieSession = require('cookie-session');
const cors       = require('cors');
// const db_user    = require('./db_helpers/db_user_helpers');

// PG database client/connection setup

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
}));

app.use(express.static(path.join(__dirname, './public')));
app.use(cors())

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userRoutes = require("./routes/users");
const resourceRoutes = require('./routes/resources');

// Databases
const db_user = require('./db_helpers/db_user_helpers');
const db_resource = require('./db_helpers/db_resource_helpers');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: mount other resources here, using the same pattern above


// User endpoints
// express.Router();
const userRouter = userRoutes(db_user);
app.use('/api/users', userRouter);

//Resource endpoints
// const resourceRouter = express.Router();
const resourceRouter = resourceRoutes(db_resource);
app.use('/api/resources', resourceRouter);

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
