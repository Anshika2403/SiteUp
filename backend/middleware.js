const jwt = require("jsonwebtoken")
const Website = require("./models/website")

const authenticate = (req,res,next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "").trim();

    if(!token){
        return res.status(401).json({error:"Authentication required"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(400).json({ error: "Invalid token payload" });
          }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({error:"Invalid token"})
    }
}

const authorize = async (req, res, next) => {
    try {
        const websiteId = req.params.id || req.body.websiteId;
        if (!websiteId) {
            return res.status(400).json({ error: "Website ID is required" });
        }

        const website = await Website.findById(websiteId);
        if (!website) {
            return res.status(404).json({ message: "Website not found" });
        }

        if (!req.user) {
            return res.status(401).json({ error: "Authentication required for authorization" });
        }

        if (website.userId.toString() !== req.user.id.toString()) {
            return res.status(403).json({ message: "You are not authorized to access this resource" });
        }

        next();
    } catch (error) {
        console.error("Authorization error:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {authenticate, authorize};