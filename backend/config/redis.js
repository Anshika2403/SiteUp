const redis = require("redis");

const redisClient = redis.createClient({
    host: '127.0.0.1', 
    port: 6379,        
  });

redisClient
  .connect()
  .then(() => {
    console.log("Connected to Redis");
  })
  .catch((err) => {
    console.log("Error connecting to Redis", err);
  });

module.exports = redisClient;