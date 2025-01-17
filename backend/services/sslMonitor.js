const { sendNotification } = require("./notifyService");
const checkSSLExpiry = require("../utils/sslCheck");

const monitorSSL = async (website,res) => {
  try {
    const sslStatus = await checkSSLExpiry(website.url);

    if (!sslStatus || sslStatus.error) {
      // Notify the user that no SSL certificate was found
      // await sendNotification({
      //   userId: website.userId,
      //   websiteId: website._id,
      //   type: website.notifyType,
      //   message: `No SSL certificate was found for your website ${website.name}. Please check and install an SSL certificate.`,
      // });
      return res.status(200).json({
        message: `No SSL certificate was found for your website ${website.name}. Please check and install an SSL certificate.`,
      });
    }

    if (sslStatus.nearExpiry) {
      // await sendNotification({
      //     userId: website.userId,
      //     websiteId: website._id,
      //     type:website.notifyType,
      //     message: `Your website ${website.name} SSL certificate is expiring in ${sslStatus.daysToExpiry}`
      // })
      return res
        .status(200)
        .json({
          message: `Your website ${website.name} SSL certificate is expiring in ${sslStatus.daysToExpiry}`,
        });
    } else {
      return res
        .status(200)
        .json({
          message: `Your website ${website.name} SSL certificate is valid`,
        });
    }
  } catch (error) {
    // console.error(`Error checking SSL for ${website.name}:`, error);
    return res.status(500).json({ error: "Error checking SSL certificate" });
  }
};

module.exports = monitorSSL;
