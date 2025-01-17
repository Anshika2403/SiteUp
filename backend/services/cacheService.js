const redisClient = require("../config/redis");

async function cacheLinks(url, links) {
    await redisClient.set(url, JSON.stringify(links), 'EX' ,24 * 3600);
}

async function getCachedLinks(url) {
    const cachedLinks = await redisClient.get(url);
    return cachedLinks ? JSON.parse(cachedLinks) : null;
}

module.exports = { cacheLinks, getCachedLinks };