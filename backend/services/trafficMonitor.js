// const Traffic = require("../models/traffic");
// const Notify = require("../models/notify");
// const Website = require("../models/website");
// const sendNotification = require("./notifyService");

// async function trackTraffic(websiteId, requestCount) {
//   const traffic = new Traffic({ websiteId, requestCount });
//   await traffic.save();

//   const trafficData = await Traffic.find({ websiteId })
//     .sort({ timestamp: -1 })
//     .limit(10);

//   const requestCounts = trafficData.map((data) => data.requestCount);

//   const avg = requestCounts.reduce((a, b) => a + b, 0) / requestCounts.length;
//   const sd = Math.sqrt(
//     requestCounts.reduce((a, b) => a + Math.pow(b - avg, 2), 0) /
//       requestCounts.length
//   );

//   const threshold = avg + 2 * sd;
//   if (requestCount > threshold) {
//     const website = await Website.findOne({ websiteId });
//     const notification = await Notify.findOne({ websiteId });

//     const log = new Log({
//       websiteId,
//       status: "unknown",
//       responeTime: 0,
//       message: `Unusual traffic detected for ${website.name}. Requsts: ${requestCount}`,
//     });

//     await sendNotification({
//       userId: notification.userId,
//       websiteId,
//       type: notification.type,
//       message: `Unusual traffic detected for ${website.name}.`,
//     });
//   }
// }

// module.exports = trackTraffic;

const Website = require("../models/website");
const { google } = require("googleapis");

async function fetchAnalyticsData(websiteId) {
  try {
    const website = await Website.findById(websiteId);
    if (!website) {
      console.error("Website or AnalyticsId not found");
      return;
    }

    const auth = new google.auth.GoogleAuth({
      keyFilename: process.env.GOOGLE_SERVICE_CREDENTIALS,
      scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
    });

    const analyticsData = google.analyticsdata("v1beta");

    const [trafficData, userData, eventData] = await Promise.all([
      // Traffic data report
      analyticsData.properties.runReport({
        auth,
        property: `properties/473081909`,
        requestBody: {
          dateRanges: [{
            startDate: "1daysAgo",
            endDate: "today"
          }],
          dimensions: [
            { name: "date" },
            { name: "deviceCategory" }
          ],
          metrics: [
            { name: "sessions" },
            { name: "activeUsers" },
            { name: "screenPageViews" },
            { name: "bounceRate" },
          ],
          orderBys: [
            {
              dimension: {
                orderType: "ALPHANUMERIC",
                dimensionName: "date"
              }
            }
          ]
        }
      }),

      // User behavior report
      analyticsData.properties.runReport({
        auth,
        property: `properties/473081909`,
        requestBody: {
          dateRanges: [{
            startDate: "1daysAgo",
            endDate: "today"
          }],
          dimensions: [
            { name: "deviceCategory" }
          ],
          metrics: [
            { name: "totalUsers" },
            { name: "averageSessionDuration" },
            { name: "engagedSessions" },
            { name: "screenPageViews" },
          ],
          limit: 10
        }
      }),

      // Event tracking report
      analyticsData.properties.runReport({
        auth,
        property: `properties/473081909`,
        requestBody: {
          dateRanges: [{
            startDate: "1daysAgo",
            endDate: "today"
          }],
          dimensions: [
            { name: "eventName" }
          ],
          metrics: [
            { name: "eventCount" },
            { name: "eventValue" }
          ],
          orderBys: [
            {
              metric: {
                metricName: 'eventCount'
              },
              desc: true
            }
          ],
          limit: 20
        }
      }),
    ]);

    const formattedData = {
      traffic: {
        dailyStats: trafficData.data.rows ? trafficData.data.rows.map(row => ({
          date: row.dimensionValues[0].value,
          device: row.dimensionValues[1].value,
          sessions: parseInt(row.metricValues[0].value),
          activeUsers: parseInt(row.metricValues[1].value),
          pageViews: parseInt(row.metricValues[2].value),
          bounceRate: parseFloat(row.metricValues[3].value),
        })): []
      },
      userBehavior: {
        byDevice: userData.data.rows ? userData.data.rows.map(row => ({
          deviceCategory: row.dimensionValues[0].value,
          users: parseInt(row.metricValues[0].value),
          avgSessionDuration: parseFloat(row.metricValues[1].value),
          engagedSessions: parseInt(row.metricValues[2].value),
          pageViews: parseInt(row.metricValues[3].value)
        })): []
      },
      events: {
        topEvents: eventData.data.rows ? eventData.data.rows.map(row => ({
          eventName: row.dimensionValues[0].value,
          count: parseInt(row.metricValues[0].value),
          value: parseFloat(row.metricValues[1].value)
        })): []
      }
    };

    const summary = {
      totalSessions: formattedData.traffic.dailyStats.reduce((sum, day) => sum + day.sessions, 0),
      totalUsers: formattedData.traffic.dailyStats.reduce((sum, day) => sum + day.activeUsers, 0),
      totalPageViews: formattedData.traffic.dailyStats.reduce((sum, day) => sum + day.pageViews, 0),
      avgBounceRate: formattedData.traffic.dailyStats.reduce((sum, day) => sum + day.bounceRate, 0) / 
                    formattedData.traffic.dailyStats.length
    };

    // return {
    //   websiteName: website.name,
    //   summary,
    //   ...formattedData
    // };

    const last30Days = [...Array(30)].map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return date.toISOString().split('T')[0];
    });
  
    return {
      websiteName: "Example Website",
      summary: {
        totalSessions: 45280,
        totalUsers: 32150,
        totalPageViews: 128900,
        avgBounceRate: 42.5
      },
      traffic: {
        dailyStats: last30Days.map(date => ({
          date,
          device: ['mobile', 'desktop', 'tablet'][Math.floor(Math.random() * 3)],
          sessions: Math.floor(Math.random() * 2000) + 1000,
          activeUsers: Math.floor(Math.random() * 1500) + 800,
          pageViews: Math.floor(Math.random() * 5000) + 2000,
          bounceRate: Math.random() * 20 + 35
        }))
      },
      userBehavior: {
        byDevice: [
          {
            deviceCategory: "Desktop",
            totalUsers: 15234,
            averageSessionDuration: 285, // in seconds
            engagedSessions: 12567,
            pageViews: 45890
          },
          {
            deviceCategory: "Mobile",
            totalUsers: 28456,
            averageSessionDuration: 164,
            engagedSessions: 20123,
            pageViews: 68345
          },
          {
            deviceCategory: "Tablet",
            totalUsers: 5678,
            averageSessionDuration: 210,
            engagedSessions: 4234,
            pageViews: 12456
          }
        ]
      },
      events: {
        topEvents: [
          { eventName: "page_view", count: 128900, value: 1.0 },
          { eventName: "sign_up", count: 2450, value: 5.0 },
          { eventName: "purchase", count: 1280, value: 25.0 },
          { eventName: "download", count: 3600, value: 2.0 },
          { eventName: "contact_form", count: 890, value: 3.0 }
        ]
      }
    };

  } catch (error) {
    console.error("Error fetching analytics data", error);
    return {error :error.message};
  }
}

module.exports = fetchAnalyticsData;
