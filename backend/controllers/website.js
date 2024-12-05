const Website = require("../models/website");


module.exports.getWebsites = async (req, res) => {
    try {
        const websites = await Website.find({userId:req.user.id});
        res.status(200).json(websites); 
    } catch (error) {
        res.status(400).json({error:error.msg})
    }
};

module.exports.addWebsite = async (req,res) => {
    try {
        const website = new Website(req.body);
        await website.save();
        res.status(201).json(website)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports.getWebsiteById = async(req,res) => {
    try {
        const website = await Website.findById(req.params.id);
        if(!website){
            return res.status(404).json({error: "Website not found"})
        }
        res.status(200).json(website);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports.updateWebsite = async(req,res) => {
    try{
        const updatedWebsite = await Website.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!updatedWebsite){
            return res.status(404).json({error: "Website not found"})
        }
        res.status(200).json(updatedWebsite)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports.deleteWebsite = async(req,res) =>{
    try {
        const deletedWebsite = await Website.findByIdAndDelete(req.params.id);
        if(!this.deletedWebsite){
            return res.status(404).json({error : "Website not found"})
        }
        res.status(200).json({message:"Website deleted successfully"})
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}