require("dotenv").config({ path: "../.env" });

const express = require("express");
const multer = require("multer");
const connectDB = require("./config/db");
const cors = require("cors");
const userRoutes = require("./routes/user");
const websiteRoutes = require("./routes/website");
const logRoutes = require("./routes/log");
const notifyRoutes = require("./routes/notify");
const trafficRoutes = require("./routes/traffic");
const {scheduleLinkMonitoring, scheduleMonitoring} = require ("./services/schedules.js");
const {authenticate} = require("./middleware");

let app = express();
let upload = multer();

app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
}));

let PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.none());

app.use("/",userRoutes)

app.use(authenticate);

app.use("/website", websiteRoutes);
app.use("/log", logRoutes);
app.use("/notify",notifyRoutes);
app.use("/traffic",trafficRoutes);

connectDB()
  .then(() => {
    // scheduleMonitoring();
    // scheduleLinkMonitoring();
    console.log("Scheduled monitoring services started.");
  })
  .catch((err) => {
    console.error("Failed to initialize application:", err);
    process.exit(1); 
  });

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
