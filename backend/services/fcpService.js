const Log = require("../models/log");

async function getWeeklyFcpAverages(websiteId) {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7); 

    const logs = await Log.find({
      websiteId,
      checkedAt: { $gte: startDate, $lte: endDate },
    });

    if (!logs || logs.length === 0) {
      console.log("No logs found for the last 7 days.");
      return []; 
    }

    const logsByDate = logs.reduce((acc, log) => {
      const date = log.checkedAt.toISOString().split('T')[0]; 
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(log.fcp); 
      return acc;
    }, {});

    const formattedData = Object.keys(logsByDate).map((date) => {
      const fcpValues = logsByDate[date];
      const avgFcp = fcpValues.length > 0 
        ? fcpValues.reduce((sum, fcp) => sum + fcp, 0) / fcpValues.length
        : 0;
      return {
        date,
        avgFcp: avgFcp, 
        logCount: fcpValues.length,  
      };
    });

    return formattedData;
  } catch (error) {
    console.error("Error fetching weekly FCP averages:", error);
    throw error;
  }
}

module.exports = { getWeeklyFcpAverages };