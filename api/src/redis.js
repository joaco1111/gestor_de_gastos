const redis = require('redis');

const connectRedis = async() => {
    const client = redis.createClient({
        url: 'redis://red-cogri7a0si5c738tspg0:6379'
    });

    client.on('error', err => console.log('Redis Client Error', err));

    await client.connect();

    return client;

} 

module.exports = connectRedis;