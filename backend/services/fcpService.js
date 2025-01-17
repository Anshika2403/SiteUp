const Log = require("../models/log");

async function getWeeklyFcpAverages(websiteId) {
  try {
    // Calculate the date range: 7 days before today
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7); // Get data for the last 7 days

    // Fetch logs for the website within the last 7 days
    const logs = await Log.find({
      websiteId,
      checkedAt: { $gte: startDate, $lte: endDate },
    });

    // Check if there are any logs available for the date range
    if (!logs || logs.length === 0) {
      console.log("No logs found for the last 7 days.");
      return []; // Return an empty array if no logs are found
    }

    // Group logs by date
    const logsByDate = logs.reduce((acc, log) => {
      const date = log.checkedAt.toISOString().split('T')[0]; // Get date in "YYYY-MM-DD" format
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(log.fcp); // Add fcp values for the same day
      return acc;
    }, {});

    // Calculate the average fcp and log count for each day
    const formattedData = Object.keys(logsByDate).map((date) => {
      const fcpValues = logsByDate[date];
      const avgFcp = fcpValues.length > 0 
        ? fcpValues.reduce((sum, fcp) => sum + fcp, 0) / fcpValues.length  // Calculate average fcp
        : 0;
      return {
        date,
        avgFcp: avgFcp,  // Calculated average fcp
        logCount: fcpValues.length,  // Number of logs for that day
      };
    });

    return formattedData;
  
    // return formattedData;
  //   { date: "2025-01-11", avgFcp: 1453.4, logCount: 20 },
  // { date: "2025-01-12", avgFcp: 1550.3, logCount: 22 },
  // { date: "2025-01-13", avgFcp: 1600.1, logCount: 28 },
  // { date: "2025-01-14", avgFcp: 1523.8, logCount: 24 },
  // { date: "2025-01-15", avgFcp: 1498.9, logCount: 26 }
  } catch (error) {
    console.error("Error fetching weekly FCP averages:", error);
    throw error;
  }
}

module.exports = { getWeeklyFcpAverages };