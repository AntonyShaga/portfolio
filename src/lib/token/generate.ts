/**
 * Generates a JWT token for contact form submissions with rate limiting and IP tracking.
 *
 * This function:
 * 1. Extracts and validates the client IP address from request headers
 * 2. Implements rate limiting using Redis to prevent abuse
 * 3. Generates a secure JWT token with claims including a unique ID (jti)
 * 4. Stores token metadata in Redis for validation and tracking
 *
 * @async
 * @function generateContactToken
 * @param {NextRequest} req - The Next.js request object containing headers
 * @returns {Promise<string>} A Promise that resolves to the generated JWT token
 * @throws {Error} Will throw an error if:
 *   - IP address is invalid
 *   - Rate limit is exceeded
 *   - JWT_SECRET environment variable is not configured
 *
 * @example
 * const token = await generateContactToken(request);
 *
 * @property {object} payload - JWT payload containing:
 *   @property {string} jti - Unique token identifier (UUID)
 *   @property {string} iss - Issuer (fixed as 'contact-service')
 *   @property {string[]} aud - Audience (['contact-form', 'web-app'])
 *   @property {number} iat - Issued at timestamp (seconds since epoch)
 *   @property {string} ip - Client IP address
 *
 * @property {object} tokenConfig - Configuration from './config':
 *   @property {number} rateLimitWindow - Time window for rate limiting in seconds
 *   @property {number} rateLimitMaxRequests - Maximum allowed requests per window
 *   @property {number|string} expiration - JWT expiration time
 *   @property {string} algorithm - JWT signing algorithm
 *   @property {number} redisExpiration - TTL for Redis token metadata
 *
 * @see {@link https://nextjs.org/docs/api-reference/next/server} for NextRequest
 * @see {@link https://github.com/redis/node-redis} for Redis client
 * @see {@link https://github.com/auth0/node-jsonwebtoken} for JWT operations
 */
import { NextRequest } from 'next/server';
import { redis } from '@/lib/redis';
import jwt, { SignOptions } from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { isIP } from 'net';
import { tokenConfig } from './config';

export async function generateContactToken(req: NextRequest): Promise<string> {
  const ipHeader =
    req.headers.get('x-real-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    'unknown';
  const ip = isIP(ipHeader) ? ipHeader : 'invalid';

  if (ip === 'invalid') {
    throw new Error('Invalid IP address');
  }

  const redisRateLimitKey = `rate_limit:contact_token:${ip}`;
  const currentCount = await redis.incr(redisRateLimitKey);

  if (currentCount === 1) {
    await redis.expire(redisRateLimitKey, tokenConfig.rateLimitWindow);
  }

  const isTrustedIP = process.env.TRUSTED_IPS?.split(',').includes(ip);
  if (!isTrustedIP && currentCount > tokenConfig.rateLimitMaxRequests) {
    await redis.expire(redisRateLimitKey, tokenConfig.rateLimitWindow * 2);
    throw new Error('Too many token generation requests');
  }

  const jti = randomUUID();
  const payload = {
    jti,
    iss: 'contact-service',
    aud: ['contact-form', 'web-app'],
    iat: Math.floor(Date.now() / 1000),
    ip,
  };

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }

  const signOptions: SignOptions = {
    expiresIn: tokenConfig.expiration,
    algorithm: tokenConfig.algorithm,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, signOptions);

  await redis.set(
    `contact_token:${jti}`,
    JSON.stringify({
      status: 'valid',
      createdAt: new Date().toISOString(),
      ip,
      userAgent: req.headers.get('user-agent') || 'unknown',
      rateLimitCount: currentCount,
    }),
    'EX',
    tokenConfig.redisExpiration,
  );
  return token;
}
