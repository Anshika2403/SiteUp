const Log = require("../models/log");
const Website = require("../models/website");
const moment = require("moment");

const convertMillisecondsToTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { hours, minutes, seconds };
};

const calculateDailyUptimeAndDowntime = (logs) => {
  let uptimeDuration = 0;
  let downtimeDuration = 0;

  if(logs.length === 1){
    
    if (logs[0].status === "online") {
      uptimeDuration += 1;
    } else {
      downtimeDuration += 1;
    }
  }

  for (let i = 0; i < logs.length - 1; i++) {
    const currentLog = logs[i];
    const nextLog = logs[i + 1];

    const duration =
      new Date(nextLog.checkedAt).getTime() -
      new Date(currentLog.checkedAt).getTime();

    if (currentLog.status === "online") {
      uptimeDuration += duration;
    } else {
      downtimeDuration += duration;
    }
  }
  const readableUptime = convertMillisecondsToTime(uptimeDuration);
  const readableDowntime = convertMillisecondsToTime(downtimeDuration);

  const totalDuration = uptimeDuration + downtimeDuration;
  const uptimePercentage = (uptimeDuration / totalDuration) * 100;
  const downtimePercentage = (downtimeDuration / totalDuration) * 100;
  readableUptime.percentage = uptimePercentage;
  readableDowntime.percentage = downtimePercentage;
  return { readableUptime, readableDowntime };

  // console.log(uptimePercentage);
  // console.log(downtimePercentage);

  // return { uptimePercentage, downtimePercentage, totalDuration };
};

const getMonthlyLogs = async (websiteId, year, month) => {
  const dailyStats = [];
  let previousUptimePercentage = 0;

  const website = await Website.findById(websiteId).select("createdAt");
  const websiteCreatedAt = moment(website.createdAt);

  // if(websiteCreatedAt.isAfter(`${year}-${month}`, "month")){
  //   return "Website created after the selected month";
  // }

  const daysInMonth = moment(`${year}-${month}`, "YYYY-MM").daysInMonth();
  const today = moment();
  const currentMonth = today.format("MM") === String(month).padStart(2, '0') && today.format("YYYY") === year; 


  const startDay = websiteCreatedAt.isSame(`${year}-${month}`, "month")
    ? websiteCreatedAt.date()
    : 1;

  const endDay = currentMonth ? today.date() : daysInMonth;

  for (let day = startDay; day <= endDay; day++) {
    const startDate = moment(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`).startOf("day").toDate();
    const endDate = moment(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`).endOf("day").toDate();

    const logs = await Log.find({
      websiteId,
      checkedAt: { $gte: startDate, $lt: endDate },
    });
    if (logs.length === 0) {
      dailyStats.push({
        day: day,
        uptimePercentage: previousUptimePercentage,
        downtimePercentage: 100 - previousUptimePercentage,
        totalLogs: 0,
      });
    } else {
      const dailyStatsForDay = calculateDailyUptimeAndDowntime(logs);
      dailyStats.push({
        day: day,
        uptimePercentage: dailyStatsForDay.readableUptime.percentage,
        downtimePercentage: dailyStatsForDay.readableDowntime.percentage,
        totalLogs: dailyStatsForDay.totalLogs,
      });
      previousUptimePercentage = dailyStatsForDay.readableUptime.percentage;
    }
  }

  return dailyStats;
};

module.exports = { getMonthlyLogs, calculateDailyUptimeAndDowntime };
