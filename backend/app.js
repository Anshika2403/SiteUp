require("dotenv").config({ path: "../.env" });

const express = require("express");
const multer = require("multer");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user");
const websiteRoutes = require("./routes/website");

let app = express();
let upload = multer();

let PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.none());

app.use("/",userRoutes)
app.use("/website", websiteRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
