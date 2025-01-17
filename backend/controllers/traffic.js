const Website = require("../models/website");
const fetchAnalyticsData = require("../services/trafficMonitor");

module.exports.getTraffic = async (req, res) => {
    const  id  = req.params.id;
    try {
        const result = await fetchAnalyticsData(id);
        res.status(200).json(result);

}catch (error) {
        res.status(500).json({ error: error.message });
    }
}