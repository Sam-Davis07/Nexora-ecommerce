require("dotenv").config();

const { redisClient, connectRedis } = require("./config/redis");

async function testRedis() {
  try {
    await connectRedis();

    await redisClient.set("nexora:test", "Redis is working!");

    const result = await redisClient.get("nexora:test");

    console.log("Redis response:", result);
  } catch (error) {
    console.error("Redis test failed:", error);
  } finally {
    if (redisClient.isOpen) {
      await redisClient.quit();
    }
  }
}

testRedis();