const Notify = require("../models/notify.js");
const sendEmail = require("./emailService");
const User = require("../models/user");
const Website = require("../models/website");

module.exports.sendNotification = async (notificationData) => {
  try {
    const notification = new Notify(notificationData);
    await notification.save();

    if (notification.type === "email") {
      const user = await User.findById(notificationData.userId).select("email");
            if (!user || !user.email) {
                throw new Error("User email not found.");
            }
            const mail = user.email; // Extract email

            // Fetch website name
            const website = await Website.findById(notificationData.websiteId).select("name");
            if (!website || !website.name) {
                throw new Error("Website name not found.");
            }
            const name = website.name; // Extract name


      await sendEmail({
        to: mail,
        subject: `Monitor Notification for ${name}`,
        text: notificationData.message,
      });
    }
    //else if(notification.type === "sms"){
    //     // send sms
    // }

    notification.sentAt = new Date();
    await notification.save();
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};
