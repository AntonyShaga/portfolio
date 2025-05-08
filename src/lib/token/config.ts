export const tokenConfig = {
  algorithm: 'HS256' as const,
  expiration: parseInt(process.env.TOKEN_EXPIRATION || '600'),
  redisExpiration: parseInt(process.env.REDIS_EXPIRATION || '670'),
  rateLimitWindow: parseInt(process.env.RATE_LIMIT_WINDOW || '60'),
  rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '10'),
};
