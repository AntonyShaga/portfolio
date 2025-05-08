import { NextRequest, NextResponse } from 'next/server';
import { validateContactToken, TokenValidationError } from '../validateContactToken';

/**
 * Higher-order function that creates a middleware for validating contact tokens.
 * Wraps a request handler with token validation logic and error handling.
 *
 * @function withContactValidation
 * @param {function} handler - The original route handler function to be protected
 * @returns {function} A middleware function that:
 *  1. Attempts to validate the contact token
 *  2. On success, executes the original handler
 *  3. On failure, returns an appropriate error response
 *
 * @typedef {function} ProtectedHandler
 * @param {NextRequest} req - The incoming Next.js request object
 * @returns {Promise<NextResponse>} The response from the protected handler
 *
 * @throws {TokenValidationError} When token validation fails with specific error codes
 * @throws {Error} For unexpected internal server errors
 *
 * @example
 * // Protect a route handler:
 * export const POST = withContactValidation(async (req) => {
 *   // Your protected logic here
 *   return NextResponse.json({ success: true });
 * });
 *
 * @property {Object} ErrorResponse - Structure of error responses:
 * @property {string} error - Human-readable error message
 * @property {string} [code] - Machine-readable error code (for TokenValidationError)
 *
 * @see {@link validateContactToken} For the token validation implementation
 * @see {@link TokenValidationError} For error type details
 *
 * @middleware
 * This middleware:
 * - Logs validation attempts and outcomes
 * - Maintains security by validating before handler execution
 * - Provides consistent error responses
 * - Handles both expected and unexpected errors
 */

export function withContactValidation(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    try {
      console.log(`[Auth] Validating contact token for ${req.url}`);
      await validateContactToken(req);
      return await handler(req);
    } catch (error) {
      if (error instanceof TokenValidationError) {
        console.warn(`[Auth] Validation failed: ${error.code}`);
        return NextResponse.json(
          { error: error.message, code: error.code },
          { status: error.statusCode },
        );
      }
      console.error('[Auth] Unexpected error:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  };
}
