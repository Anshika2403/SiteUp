const https = require("https");

async function checkSSLExpiry(url) {
  try {

    const parsedUrl = new URL(url);

    if (parsedUrl.protocol !== "https:") {
      return {
        error: true,
        message: `The URL "${url}" does not use HTTPS.`,
      };
    }

    const options = {
      method: "GET",
      host: parsedUrl.hostname,
      port: 443,
      servername: parsedUrl.hostname,
    };

    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        if (!res) {
          resolve({
            error: true,
            message: "No response from server.",
          });
          return;
        }
        const cert = res.socket.getPeerCertificate();

        if (!cert || Object.keys(cert).length === 0) {
          resolve({
            error: true,
            message: "The site did not provide an SSL certificate.",
          });
          return;
        }

        const certExpiry = new Date(cert.valid_to);
        const currDate = new Date();

        const daysToExpiry = Math.floor(
          (certExpiry - currDate) / (1000 * 3600 * 24)
        );
        resolve({
          nearExpiry: daysToExpiry <= 30,
          daysToExpiry,
        });
      });
      req.on("error", (error) => {
        resolve({
          error: true,
          message: `Request error: ${error.message}`,
        });
      });

      req.setTimeout(30000, () => {
        req.destroy(new Error("Request timed out"));
        resolve({
          error: true,
          message: "Request timed out.",
        });
      });
      req.end();
    });
  } catch (error) {
    console.error("Error processing URL:", error.message);
    return {
      error: true,
      message: `Unexpected error: ${error.message}`,
    };
  }
}

module.exports = checkSSLExpiry;
