const Website = require("../models/website");
const extractMetrics = require("../services/extractMetrics");
const  monitorLinks  = require("../services/monitorLinks");
const monitorWebsite = require("../services/responseMonitor");
const monitorSSL = require("../services/sslMonitor");
const fetchAnalyticsData = require("../services/trafficMonitor");

module.exports.getWebsites = async (req, res) => {
  try {
    const websites = await Website.find({ userId: req.user.id });
    res.status(200).json(websites);
  } catch (error) {
    res.status(400).json({ error: error.msg });
  }
};

module.exports.addWebsite = async (req, res) => {
  try {
    const website = new Website({...req.body, userId: req.user.id});
    await website.save();
    res.status(201).json(website);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.getWebsiteById = async (req, res) => {
  try {
    const website = await Website.findById(req.params.id);
    if (!website) {
      return res.status(404).json({ error: "Website not found" });
    }
    res.status(200).json(website);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.getWebsiteByName = async (req, res) => {
  try {
    const website = await Website.findOne({name: req.params.name}).select("_id");
    if (!website) {
      return res.status(404).json({ error: "Website not found" });
    }

    res.status(200).json({id: website._id});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateWebsite = async (req, res) => {
  try {
    const updatedWebsite = await Website.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedWebsite) {
      return res.status(404).json({ error: "Website not found" });
    }
    res.status(200).json(updatedWebsite);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.deleteWebsite = async (req, res) => {
  try {
    const deletedWebsite = await Website.findByIdAndDelete(req.params.id);
    if (!this.deletedWebsite) {
      return res.status(404).json({ error: "Website not found" });
    }
    res.status(200).json({ message: "Website deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.monitorUrl = async (req, res) => {
  try {
    const website = await Website.findById(req.params.id);
    if (!website) {
      return res.status(404).json({ error: "Website not found" });
    }
    const result = await monitorWebsite(website);
    res.status(result.status).json({ message:result.message, responseTime:result.responseTime ,fcp:result.fcp, lcp:result.lcp});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports.monitorWebsiteLinks = async (req, res) => {
  try {
    const website = await Website.findById(req.params.id);
    if (!website) {
      return res.status(404).json({ error: "Website not found" });
    }
    const result = await monitorLinks(website.url, website._id, website.userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports.toggleMonitor = async(req,res) => {
  try{
    const websiteId = req.params.id;
    const website = await Website.findById(websiteId);

    if(!website){
      return res.status(404).json({error:"Website not found"});
    }

    website.monitoringActive = !website.monitoringActive;
    await website.save();

    res.status(200).json({
      message:`Monitoring for ${website.name} is now ${website.monitoringActive ? "enabled" : "disabled"}`,
    })
  }catch(error){
    res.status(500).json({error:error.message});
  }
}

module.exports.checkSSL = async (req, res) => {
  try {
    const website = await Website.findById(req.params.id);
    if (!website) {
      return res.status(404).json({ error: "Website not found" });
    }
    await monitorSSL(website,res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports.getTraffic = async (req, res) => {
  try {
    await fetchAnalyticsData(req.params.id);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}