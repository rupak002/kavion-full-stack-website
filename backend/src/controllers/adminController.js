const { state } = require('../utils/dataStore');
const { ok } = require('../utils/responseHelper');

function dashboardStats(_req, res) {
  return ok(res, {
    totalProducts: state.products.length,
    totalBlogs: state.blogs.length,
    totalGallery: state.gallery.length,
    totalContacts: state.contacts.length,
    totalUsers: state.users.length,
    recentContacts: [...state.contacts].slice(-5).reverse(),
  });
}

module.exports = { dashboardStats };
