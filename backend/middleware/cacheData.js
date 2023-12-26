import redis from 'redis';

export const redisClient = async () => {
  const redis_client = redis.createClient();
  redis_client.on('error', (error) => console.error(`Error : ${error}`));
  return await redis_client.connect();
};

export const cacheData = async (req, res, next) => {
  try {
    const redis_client = await redisClient();
    const { id } = req.params;
    let results;
    const cacheResult = await redis_client.get(id);
    if (cacheResult) {
      results = JSON.parse(cacheResult);
      res.status(200).json(results);
    } else {
      next();
    }
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
};
