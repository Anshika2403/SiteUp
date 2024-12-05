const express = require("express");
const router = express.Router();
const websiteController = require("../controllers/website.js");
const { authenticate } = require("../middlware.js");

router
  .route("/")
  .get(authenticate, websiteController.getWebsites)
  .post(authenticate, websiteController.addWebsite);

router
  .route("/:id")
  .get(websiteController.getWebsiteById)
  .put(websiteController.updateWebsite)
  .delete(websiteController.deleteWebsite);

module.exports = router;
