const { verifyAccessToken } = require('../utils/tokens');
const { fail } = require('../utils/responseHelper');

function extractToken(req) {
  const authHeader = req.headers.authorization || '';
  if (authHeader.startsWith('Bearer ')) return authHeader.slice(7);
  if (req.cookies?.accessToken) return req.cookies.accessToken;
  return null;
}

function isAuthenticated(req, res, next) {
  try {
    const token = extractToken(req);
    if (!token) return fail(res, 401, 'Authentication required');
    const payload = verifyAccessToken(token);
    req.user = payload;
    return next();
  } catch (error) {
    return fail(res, 401, 'Invalid or expired token');
  }
}

function isAdmin(req, res, next) {
  if (req.user?.role !== 'admin') return fail(res, 403, 'Admin access required');
  return next();
}

module.exports = { isAuthenticated, isAdmin };
