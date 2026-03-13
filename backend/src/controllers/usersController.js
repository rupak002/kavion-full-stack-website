const { state } = require('../utils/dataStore');
const { ok, fail } = require('../utils/responseHelper');

function clean(user) {
  const { password, ...rest } = user;
  return rest;
}

function listUsers(_req, res) {
  return ok(res, state.users.map(clean));
}

function updateRole(req, res) {
  const user = state.users.find((u) => u.id === req.params.id);
  if (!user) return fail(res, 404, 'User not found');

  const { role } = req.body;
  if (!['user', 'admin'].includes(role)) return fail(res, 400, 'Invalid role');

  user.role = role;
  return ok(res, clean(user), 'Role updated');
}

function deleteUser(req, res) {
  const idx = state.users.findIndex((u) => u.id === req.params.id);
  if (idx === -1) return fail(res, 404, 'User not found');

  state.users.splice(idx, 1);
  return ok(res, {}, 'User deleted');
}

module.exports = { listUsers, updateRole, deleteUser };
