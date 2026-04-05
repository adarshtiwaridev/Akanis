// In-memory rate limiter for Next.js App Router
// Uses Map to store IP-based request counts with time windows

const rateLimitMap = new Map();

/**
 * Extracts client IP from Next.js Request headers
 * @param {Request} request - Next.js Request object
 * @returns {string} - Client IP address or fallback
 */
function getClientIP(request) {
  // Check common proxy headers
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwarded.split(',')[0].trim();
  }

  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  // Fallback for local development
  return '127.0.0.1';
}

/**
 * Rate limiter function for Next.js
 * @param {Request} request - Next.js Request object
 * @param {Object} options - Configuration options
 * @param {number} options.limit - Max requests per window (default: 10)
 * @param {number} options.windowMs - Time window in milliseconds (default: 60000)
 * @returns {boolean} - true if request allowed, false if blocked
 */
export function rateLimiter(request, options = {}) {
  const { limit = 10, windowMs = 60000 } = options;

  const ip = getClientIP(request);
  const now = Date.now();

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, time: now });
    return true;
  }

  const data = rateLimitMap.get(ip);

  // Check if window has expired
  if (now - data.time > windowMs) {
    rateLimitMap.set(ip, { count: 1, time: now });
    return true;
  }

  // Check if limit exceeded
  if (data.count >= limit) {
    return false;
  }

  // Increment count
  data.count++;
  return true;
}