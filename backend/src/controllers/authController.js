const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { z } = require('zod');
const { state, id, now } = require('../utils/dataStore');
const { created, ok, fail } = require('../utils/responseHelper');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../utils/tokens');

const refreshStore = new Set();
const passwordResetTokens = new Map();

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function cookieOptions(maxAge) {
  return {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge,
  };
}

function sanitizeUser(user) {
  const { password, ...clean } = user;
  return clean;
}

async function register(req, res) {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) return fail(res, 400, parsed.error.issues[0].message);

  const { name, email, password } = parsed.data;
  const exists = state.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) return fail(res, 409, 'Email already in use');

  const user = {
    id: id(),
    name,
    email: email.toLowerCase(),
    password: await bcrypt.hash(password, 12),
    role: 'user',
    createdAt: now(),
  };

  state.users.push(user);
  return created(res, { user: sanitizeUser(user) }, 'Registered successfully');
}

async function login(req, res) {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return fail(res, 400, parsed.error.issues[0].message);

  const { email, password } = parsed.data;
  const user = state.users.find((u) => u.email === email.toLowerCase());
  if (!user) return fail(res, 401, 'Invalid credentials');

  const match = await bcrypt.compare(password, user.password);
  if (!match) return fail(res, 401, 'Invalid credentials');

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  refreshStore.add(refreshToken);

  res.cookie('accessToken', accessToken, cookieOptions(15 * 60 * 1000));
  res.cookie('refreshToken', refreshToken, cookieOptions(7 * 24 * 60 * 60 * 1000));

  return ok(res, { accessToken, user: sanitizeUser(user) }, 'Logged in');
}

function logout(req, res) {
  const refreshToken = req.cookies?.refreshToken;
  if (refreshToken) refreshStore.delete(refreshToken);

  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  return ok(res, {}, 'Logged out');
}

function refresh(req, res) {
  const token = req.cookies?.refreshToken || req.body?.refreshToken;
  if (!token) return fail(res, 401, 'Refresh token missing');
  if (!refreshStore.has(token)) return fail(res, 401, 'Invalid refresh token');

  try {
    const payload = verifyRefreshToken(token);
    const user = state.users.find((u) => u.id === payload.userId);
    if (!user) return fail(res, 404, 'User not found');

    const accessToken = signAccessToken(user);
    res.cookie('accessToken', accessToken, cookieOptions(15 * 60 * 1000));
    return ok(res, { accessToken }, 'Token refreshed');
  } catch {
    return fail(res, 401, 'Refresh token expired');
  }
}

function forgotPassword(req, res) {
  const email = (req.body?.email || '').toLowerCase();
  const user = state.users.find((u) => u.email === email);
  if (!user) return ok(res, {}, 'If account exists, reset instructions were sent');

  const token = crypto.randomBytes(20).toString('hex');
  passwordResetTokens.set(token, { userId: user.id, expiresAt: Date.now() + 60 * 60 * 1000 });

  return ok(res, { resetToken: token }, 'Password reset token generated');
}

async function resetPassword(req, res) {
  const { token } = req.params;
  const { password } = req.body;

  const row = passwordResetTokens.get(token);
  if (!row || row.expiresAt < Date.now()) return fail(res, 400, 'Invalid or expired reset token');
  if (!password || password.length < 8) return fail(res, 400, 'Password must be at least 8 characters');

  const user = state.users.find((u) => u.id === row.userId);
  if (!user) return fail(res, 404, 'User not found');

  user.password = await bcrypt.hash(password, 12);
  passwordResetTokens.delete(token);

  return ok(res, {}, 'Password reset successfully');
}

module.exports = { register, login, logout, refresh, forgotPassword, resetPassword };
