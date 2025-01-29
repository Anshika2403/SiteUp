const Website = require("../models/website");
const { google } = require("googleapis");

async function fetchAnalyticsData(websiteId) {
  try {
    const website = await Website.findById(websiteId);
    if (!website) {
      console.error("Website not found");
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
        property: `properties/${website.analyticsId}`,
        requestBody: {
          dateRanges: [{
            startDate: "30daysAgo",
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
        property: `properties/${website.analyticsId}`,
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
        property: `properties/${website.analyticsId}`,
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

    return {
      websiteName: website.name,
      summary,
      ...formattedData
    };

    
  } catch (error) {
    console.error("Error fetching analytics data", error);
    return {error :error.message};
  }
}

module.exports = fetchAnalyticsData;
