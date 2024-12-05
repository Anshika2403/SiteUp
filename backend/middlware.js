const jwt = require("jsonwebtoken")

module.exports.authenticate = (req,res,next) => {
    const token = req.header("Authorization")?.replace("Bearer", "").trim();
    if(!token){
        return res.status(401).json({error:"Authentication required"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({error:"Invalid token"})
    }
}