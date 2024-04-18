const redis = require('redis');

const connectRedis = async() => {
    const client = redis.createClient();

    client.on('error', err => console.log('Redis Client Error', err));

    await client.connect();

    return client;

} 

module.exports = connectRedis;