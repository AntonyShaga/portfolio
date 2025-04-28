import Redis, { RedisOptions } from 'ioredis';

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
    throw new Error('Redis configuration error: REDIS_URL is required');
}

const redisOptions: RedisOptions = {
    retryStrategy: (times) => Math.min(times * 50, 2000),
    maxRetriesPerRequest: 20,
    connectTimeout: 5000,
    keepAlive: 10000,
    tls: redisUrl.startsWith('rediss://') ? { rejectUnauthorized: false } : undefined,
};

export const redis = new Redis(redisUrl, redisOptions);

redis
    .on('connect', () => console.log('✅ Redis connected'))
    .on('ready', () => console.log('🚀 Redis ready'))
    .on('error', (err) => console.error('❌ Redis error:', err))
    .on('close', () => console.warn('🔌 Redis connection closed'))
    .on('reconnecting', () => console.log('🔁 Redis reconnecting...'));

// Graceful shutdown
process.on('SIGTERM', () => {
    redis.quit().then(() => console.log('Redis gracefully terminated'));
});

