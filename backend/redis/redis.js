const redis = require('redis');
const {promisify} = require('util');

const envKeys = require('../config/keys');

const client = redis.createClient({
  url: envKeys.REDIS_URL,
});

const setAsyncExPromise = promisify(client.setex).bind(client);
const setAsyncPromise = promisify(client.set).bind(client);
const getAsyncPromise = promisify(client.get).bind(client);
const delAsyncPromise = promisify(client.del).bind(client);

client.on('error', (err) => {
  console.log('Error in redis client: ' + err);
});

async function redisSaveWithTtl(key, value, ttlSeconds = 60) {
  return await setAsyncExPromise(key, ttlSeconds, JSON.stringify(value));
}

async function redisSave(key, value) {
  return await setAsyncPromise(key, JSON.stringify(value));
}

async function redisDeleteKey(key) {
  return await delAsyncPromise(key);
}

async function redisGet(key) {
  const jsonString = await getAsyncPromise(key);
  return jsonString ?? null;
}

module.exports = {
  redisGet,
  redisDeleteKey,
  redisSave,
  redisSaveWithTtl,
};
