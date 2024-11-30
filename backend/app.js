require("dotenv").config({ path: "../.env" });

const express = require("express");
const connectDB = require("./config/db");
let app = express();

let PORT = process.env.PORT || 8080;

connectDB();

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
