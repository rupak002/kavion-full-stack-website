const { state, id, now } = require('../utils/dataStore');
const { ok, created, fail } = require('../utils/responseHelper');

function submitContact(req, res) {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !subject || !message) return fail(res, 400, 'Missing required fields');

  const row = {
    id: id(),
    name,
    email,
    phone: phone || '',
    subject,
    message,
    isRead: false,
    createdAt: now(),
  };

  state.contacts.push(row);
  return created(res, row, 'Message received');
}

function listContacts(_req, res) {
  const rows = [...state.contacts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return ok(res, rows);
}

function markRead(req, res) {
  const row = state.contacts.find((c) => c.id === req.params.id);
  if (!row) return fail(res, 404, 'Message not found');
  row.isRead = true;
  return ok(res, row, 'Marked as read');
}

function deleteContact(req, res) {
  const idx = state.contacts.findIndex((c) => c.id === req.params.id);
  if (idx === -1) return fail(res, 404, 'Message not found');
  state.contacts.splice(idx, 1);
  return ok(res, {}, 'Deleted');
}

module.exports = { submitContact, listContacts, markRead, deleteContact };
