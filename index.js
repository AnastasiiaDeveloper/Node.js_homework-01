const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/contactsRouter");
const routesUsers = require("./routes/usersRouter");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api/contacts", routes);
app.use("/api/auth", routesUsers);
app.use("/api/users/", routesUsers);
mongoose.set("useFindAndModify", false);
async function start() {
  try {
    const url = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.xravs.mongodb.net/db-contacts`;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection successful");
    app.listen(process.env.PORT || 3000);
    // console.log(process.env);
  } catch (e) {
    process.exit(1);
  }
}
start();
