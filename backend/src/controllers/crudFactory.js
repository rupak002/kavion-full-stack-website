const slugify = require('slugify');
const { state, id, now } = require('../utils/dataStore');
const { ok, created, fail } = require('../utils/responseHelper');

function parseBool(input) {
  if (input === undefined) return undefined;
  return ['true', true, '1', 1].includes(input);
}

function list(collection, { publishedField = null, slugField = null } = {}) {
  return (req, res) => {
    let rows = [...state[collection]];

    if (collection === 'products') {
      if (req.query.category) {
        rows = rows.filter((r) => r.category?.toLowerCase() === String(req.query.category).toLowerCase());
      }
      const published = parseBool(req.query.published);
      if (published !== undefined) rows = rows.filter((r) => !!r.isPublished === published);
    }

    if (collection === 'blogs') {
      if (req.query.search) {
        const q = String(req.query.search).toLowerCase();
        rows = rows.filter((r) => r.title.toLowerCase().includes(q) || r.content.toLowerCase().includes(q));
      }
      if (req.query.category) {
        rows = rows.filter((r) => r.category?.toLowerCase() === String(req.query.category).toLowerCase());
      }
      const published = parseBool(req.query.published);
      if (published !== undefined) rows = rows.filter((r) => !!r.isPublished === published);
    }

    if (publishedField && req.query.public === 'true') {
      rows = rows.filter((r) => !!r[publishedField]);
    }

    rows.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    return ok(res, rows);
  };
}

function getOne(collection, { slugField = null } = {}) {
  return (req, res) => {
    const key = req.params.id;
    const row = slugField
      ? state[collection].find((r) => r.id === key || r[slugField] === key)
      : state[collection].find((r) => r.id === key);

    if (!row) return fail(res, 404, `${collection.slice(0, -1)} not found`);
    return ok(res, row);
  };
}

function createOne(collection, { slugField = null } = {}) {
  return (req, res) => {
    const payload = {
      id: id(),
      ...req.body,
      createdAt: now(),
    };

    if (slugField && payload.title && !payload[slugField]) {
      payload[slugField] = slugify(payload.title, { lower: true, strict: true });
    }

    if (req.file && !payload.imageUrl) {
      payload.imageUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    }

    state[collection].push(payload);
    return created(res, payload);
  };
}

function updateOne(collection, { slugField = null } = {}) {
  return (req, res) => {
    const idx = state[collection].findIndex((r) => r.id === req.params.id);
    if (idx === -1) return fail(res, 404, `${collection.slice(0, -1)} not found`);

    const current = state[collection][idx];
    const next = { ...current, ...req.body };

    if (slugField && req.body.title) {
      next[slugField] = slugify(req.body.title, { lower: true, strict: true });
    }

    if (req.file) {
      next.imageUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    }

    state[collection][idx] = next;
    return ok(res, next, 'Updated');
  };
}

function deleteOne(collection) {
  return (req, res) => {
    const idx = state[collection].findIndex((r) => r.id === req.params.id);
    if (idx === -1) return fail(res, 404, `${collection.slice(0, -1)} not found`);

    state[collection].splice(idx, 1);
    return ok(res, {}, 'Deleted');
  };
}

module.exports = { list, getOne, createOne, updateOne, deleteOne };
