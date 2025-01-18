const { extractLinks, checkLinksResponse } = require("./linkChecker");
const LinkLog = require("../models/linkLog");
const Website = require("../models/website");
const sendNotification = require("./notifyService");
const { getCachedLinks, cacheLinks } = require("./cacheService");
const extractMetrics = require("./extractMetrics");

const monitorLinks = async (url, websiteId, userId) => {
  try {
    let links = await getCachedLinks(url);
    if (!links) {
      links = await extractLinks(url);
      if (links.length === 0) {
        return;
      }
      await cacheLinks(url, links);
    }

    const website = await Website.findById(websiteId);
    const linksStatuses = await checkLinksResponse(links);

    const monitoredLinks = [];

    for (const { link, status, responseTime } of linksStatuses) {

      const linkDetails = { link, status, responseTime, fcp: null, lcp: null };
      if (status === "Error" || status >= 400) {
        const log = new LinkLog({
          websiteId,
          link,
          responseTime,
          fcp: null,
          lcp: null,
          message: status === "Error" ? `Error with link ${link}` : null,
        });
        await log.save();

        await sendNotification({
          userId,
          websiteId,
          type: website.notifyType,
          message: `Link ${link} is not working. Status: ${status}`,
        });
      }

      const metrics = await extractMetrics(link);
      if (metrics.fcp !== null || metrics.lcp !== null) {

        linkDetails.fcp = metrics.fcp;
        linkDetails.lcp = metrics.lcp;

        if (metrics.fcp > 4000) {

          const log = new LinkLog({
            websiteId,
            link,
            responseTime,
            fcp: metrics.fcp,
            lcp: metrics.lcp,
            message: `Performance issue detected for ${link}. FCP=${metrics.fcp}ms, LCP=${metrics.lcp}ms.`,
          });
          await log.save();
          await sendNotification({
            userId: userId,
            websiteId: websiteId,
            type: website.notifyType,
            message: `Performance issue detected for ${link}. FCP=${metrics.fcp}ms, LCP=${metrics.lcp}ms.`,
          });
        }
      }
      monitoredLinks.push(linkDetails);
    }
    return monitoredLinks;
  } catch (error) {
    console.error("Error monitoring links:", error);
  }
};

module.exports =  monitorLinks;
