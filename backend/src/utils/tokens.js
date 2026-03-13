const jwt = require('jsonwebtoken');

const ACCESS_EXPIRES_IN = '15m';
const REFRESH_EXPIRES_IN = '7d';

function signAccessToken(user) {
  return jwt.sign({ userId: user.id, role: user.role, email: user.email }, process.env.JWT_SECRET || 'dev_access_secret', { expiresIn: ACCESS_EXPIRES_IN });
}

function signRefreshToken(user) {
  return jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_REFRESH_SECRET || 'dev_refresh_secret', { expiresIn: REFRESH_EXPIRES_IN });
}

function verifyAccessToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET || 'dev_access_secret');
}

function verifyRefreshToken(token) {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'dev_refresh_secret');
}

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  ACCESS_EXPIRES_IN,
  REFRESH_EXPIRES_IN,
};
