const puppeteer = require("puppeteer");
const axios = require("axios");

async function extractLinks(url) {
  console.log("Extracting links from:", url);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: "networkidle2" });

    const links = await page.evaluate(() => {
      const baseUrl = document.baseURI;
      const anchorTags = Array.from(document.querySelectorAll("a"));
      return anchorTags
        .map((a) => {
          try {
            return new URL(a.href, baseUrl).href;
          } catch (err) {
            return null;
          }
        })
        .filter((href) => href);
    });
    console.log("Links extracted:", links);
    return links;
  } catch (err) {
    console.error("Error extracting links:", err);
    return [];
  } finally {
    await browser.close();
  }
}

async function checkLinksResponse(links) {
    const result = [];

    for (const link of links) {
        try {
            const startTime = Date.now();
            const response = await axios.get(link, { timeout: 5000 });
            const endTime = Date.now();
            const responseTime = endTime - startTime;
            result.push({ link, status: response.status, responseTime });
        } catch (error) {
            const responseTime = error.response ? (Date.now() - startTime) : 0;
            result.push({ link, status: error.response ? error.response.status : 'Error', responseTime });
        }
    }
    return result;
}


module.exports = { extractLinks, checkLinksResponse };
