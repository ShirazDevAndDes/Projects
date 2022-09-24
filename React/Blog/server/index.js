const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("./routes/routes");

const corsOptions = {
  origin: "*",
  credentials: true,
};
app.use(cors(corsOptions));

require("dotenv").config();

var path = require("path");

app.use(express.static(path.resolve("./public")));

app.use(cookieParser());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.set("view engine", "ejs");

app.listen(process.env.PORT || 3001, () => {
  console.log("Server Running");
});

app.get("/", (req, res) => {
  res.json("Hello from Express!");
});

app.use(router);
