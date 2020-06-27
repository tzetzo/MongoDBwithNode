const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");

const app = express();

if (process.env.NODE_ENV !== "test") {
  mongoose.connect(
    "mongodb://localhost:27017/muber",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
}

app.use(bodyParser.json()); //put above the routes!

routes(app);

module.exports = app;
