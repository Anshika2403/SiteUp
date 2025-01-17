const Log = require("../models/log");
const {
  getMonthlyLogs,
  calculateDailyUptimeAndDowntime,
} = require("../services/uptimeService");
const moment = require("moment");
const { getWeeklyFcpAverages } = require("../services/fcpService");

module.exports.getLogs = async (req, res) => {
  try {
    const { id } = req.params.id;
    const { days } = req.query;

    if (days && isNaN(days)) {
      return res
        .status(400)
        .json({ message: "Invalid number of days provided." });
    }

    let filter = { id };
    if (days) {
      const dateFrom = new Date();
      dateFrom.setDate(dateFrom.getDate() - parseInt(days, 10));
      console.log(dateFrom);
      console.log(dateFrom.setDate(dateFrom.getDate() - parseInt(days, 10)));
      filter.checkedAt = { $gte: dateFrom };
    }

    const logs = await Log.find(filter).sort({ checkedAt: -1 });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getDailyUptime = async (req, res) => {
  try {
    const id  = req.params.id;
    const { day, month, year } = req.query;
    if (!day || !month || !year) {
      return res.status(400).json({ message: "Date and month are required" });
    }
    const startDate = moment.utc(`${year}-${month}-${day}`).startOf("day").toDate();
    const endDate = moment.utc(`${year}-${month}-${day}`).endOf("day").toDate();
    const logs = await Log.find({
      websiteId: id,
      checkedAt: { $gte: startDate, $lt: endDate },
    });
    // console.log(logs.length);
    // console.log(logs);

    const result = calculateDailyUptimeAndDowntime(logs);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getMonthLogs = async (req, res) => {
  try {
    const  id  = req.params.id;
    const { year, month } = req.query;
    if (!year || !month) {
      return res.status(400).json({ message: "Year and month are required" });
    }

    const result = await getMonthlyLogs(id, year, month);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getFcpLogs = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await getWeeklyFcpAverages(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports.deleteLog = async (req, res) => {
  try {
    const { websiteId } = req.params;
    await Log.deleteMany({ websiteId });
    res.status(200).json({ message: "Log deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
