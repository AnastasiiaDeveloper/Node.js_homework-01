const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes/contactsRouter");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api/contacts", routes);
app.listen(3000);
