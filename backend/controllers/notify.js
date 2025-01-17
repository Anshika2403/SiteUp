const Notify = require("../models/notify");

module.exports.getNotify = async (req, res) => {
  try {
    const { id } = req.params;
    // const { days } = req.query;

  //   if (days && isNaN(days)) {
  //     return res.status(400).json({ message: "Invalid number of days provided." });
  // }

  // let filter = { id };
  // if (days) {
  //     const dateFrom = new Date();
  //     dateFrom.setDate(dateFrom.getDate() - parseInt(days, 10)); 
  //     filter.createdAt = { $gte: dateFrom }; 
  // }


    const notification = await Notify.find({userId:id}).sort({ sentAt: -1 });
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
