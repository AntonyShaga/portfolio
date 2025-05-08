import Redis, { RedisOptions } from 'ioredis';

/**
 * Redis connection URL from environment variables.
 * @throws {Error} If REDIS_URL is not set.
 */
const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error('Redis configuration error: REDIS_URL is required');
}

/**
 * Redis client configuration options.
 * Includes:
 * - Automatic reconnection with exponential backoff (max 2s delay)
 * - 20 max retries per request
 * - 5s connection timeout
 * - 10s keepalive
 * - TLS support for 'rediss://' URLs
 */
const redisOptions: RedisOptions = {
  retryStrategy: (times) => Math.min(times * 50, 2000),
  maxRetriesPerRequest: 20,
  connectTimeout: 5000,
  keepAlive: 10000,
  tls: redisUrl.startsWith('rediss://') ? { rejectUnauthorized: false } : undefined,
};

/**
 * Redis client instance with:
 * - Pre-configured connection options
 * - Event listeners for connection lifecycle
 * - Graceful shutdown on SIGTERM
 *
 * @event connect - Successful TCP connection
 * @event ready - Ready to accept commands
 * @event error - Connection error
 * @event close - Connection closed
 * @event reconnecting - Reconnection attempt
 */
export const redis = new Redis(redisUrl, redisOptions);

// Connection event listeners
redis
  .on('connect', () => console.log('✅ Redis connected'))
  .on('ready', () => console.log('🚀 Redis ready'))
  .on('error', (err) => console.error('❌ Redis error:', err))
  .on('close', () => console.warn('🔌 Redis connection closed'))
  .on('reconnecting', () => console.log('🔁 Redis reconnecting...'));

/**
 * Graceful shutdown handler.
 * Closes Redis connection on SIGTERM signal.
 */
process.on('SIGTERM', () => {
  redis.quit().then(() => console.log('Redis gracefully terminated'));
});
