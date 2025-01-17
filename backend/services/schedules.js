const cron = require("node-cron");
const pLimit = require ("p-limit");
const Website = require("../models/website");
const monitorWebsite = require("./responseMonitor");
const monitorLinks = require("./monitorLinks");
const monitorSSL = require("./sslMonitor");
const fetchAnalyticsData = require("./trafficMonitor");

const limit = pLimit(5);

const scheduleMonitoring = () => {
  cron.schedule("*/1 * * * *", async () => {
    const websites = await Website.find({ monitoringActive: true });
    await Promise.all(
      websites.map((website) => limit(() => monitorWebsite(website)))
    );
  });
};

const scheduleLinkMonitoring = () => {
  cron.schedule("0 0 * * *", async () => {
    const websites = await Website.find();
    await Promise.all(
      websites.map((website) =>
        limit(() => monitorLinks(website.url, website._id, website.userId))
      )
    );
  });
};

const scheduleSSLMonitoring = () => {
  cron.schedule("0 0 * * 0", async () => {
      console.log("Checking SSL certificates");
      const websites = await Website.find();
      await Promise.all(
          websites.map((website) => limit(() => monitorSSL(website)))
      );
  });
}

const scheduleTrafficMonitoring = async () => {
  cron.schedule("0 0 * * *",async () => {
    const websites = await Website.find();
    await Promise.all(
      websites.map((website) => limit(() => fetchAnalyticsData(website._id)))
    );
  });
}

module.exports = { scheduleMonitoring, scheduleLinkMonitoring, scheduleSSLMonitoring, scheduleTrafficMonitoring };
