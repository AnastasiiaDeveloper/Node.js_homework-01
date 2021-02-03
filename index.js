const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/contactsRouter");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api/contacts", routes);
mongoose.set("useFindAndModify", false);
async function start() {
  try {
    const url =
      "mongodb+srv://ForNode:ana12345@cluster0.xravs.mongodb.net/db-contacts";
    const a = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection successful");
    app.listen(3000);
  } catch (e) {
    process.exit(1);
  }
}
start();
