const axios = require("axios");
const Log = require("../models/log");
const Notify = require("../models/notify.js");
const { sendNotification } = require("./notifyService");
const extractMetrics = require("./extractMetrics");

const monitorWebsite = async (website) => {
  if (!website.monitoringActive) {
    // console.log("Monitoring is disabled for this website");
    return {
      message: "Monitoring is disabled for this website",
      status: 500,
      responseTime: 0,
    };
  }

  const startTime = Date.now();
  try {
    const response = await axios.get(website.url, { timeout: 5000 });
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;

    if (response && response.status >= 200 && response.status < 300) {

      const result = await extractMetrics(website.url);

      const log = new Log({
        websiteId: website._id,
        status: "online",
        responseTime: elapsedTime,
        fcp: result.fcp,
        lcp: result.lcp,
        message: "Your website is online",
      });
      await log.save();

      if (website.status !== "online") {
        website.status = "online";
        await website.save();

        await sendNotification({
          userId: website.userId,
          websiteId: website._id,
          type: website.notifyType,
          message: `Your website ${website.name} is now online`,
        });
      }

      
      return {
        message: "Website is online",
        status: 200,
        responseTime: elapsedTime,
        fcp: result.fcp,
        lcp: result.lcp,
      };
    } else {
      return await handleWebsiteFailure(
        website,
        elapsedTime,
        `HTTP status code:${response.status}`
      );
    }
  } catch (error) {
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;

    return await handleWebsiteFailure(
      website,
      elapsedTime,
      error.message || "Request failed"
    );
  }
};

async function handleWebsiteFailure(website, elapsedTime, errorDetail) {
  const log = new Log({
    websiteId: website._id,
    status: "offline",
    responseTime: elapsedTime,
    fcp: null,
    lcp: null,
    message: `Your website is offline. Reason: ${errorDetail}`,
  });
  await log.save();

  const message = `Website is offline. Reason: ${errorDetail}`;

  if (website.status == "offline") {
    website.status = "offline";
    await website.save();

    await sendNotification({
      userId: website.userId,
      websiteId: website._id,
      type: website.notifyType,
      message: `The website ${website.name} is offline. Reason: ${errorDetail}`,
    });
    return {
      message,
      status: 200,
      responseTime: elapsedTime,
      fcp: null,
      lcp: null,
    };
  }
}

module.exports = monitorWebsite;
