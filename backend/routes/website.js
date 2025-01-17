const express = require("express");
const router = express.Router();
const websiteController = require("../controllers/website.js");
const {authorize}  = require("../middleware");

router
  .route("/")
  .get(websiteController.getWebsites)
  .post(websiteController.addWebsite);

  router.get("/name/:name", websiteController.getWebsiteByName);

router
  .route("/:id")
  .get(authorize, websiteController.getWebsiteById)
  .patch(authorize, websiteController.updateWebsite)
  .delete(authorize, websiteController.deleteWebsite);

router.get("/monitor/:id", authorize, websiteController.monitorUrl);
router.get(
  "/monitor-links/:id",
  authorize,
  websiteController.monitorWebsiteLinks
);
router.get("/ssl/:id", authorize, websiteController.checkSSL);
router.get("/traffic/:id",authorize, websiteController.getTraffic);

router.patch(
  "/toggle-monitoring/:id",
  authorize,
  websiteController.toggleMonitor
);

module.exports = router;
