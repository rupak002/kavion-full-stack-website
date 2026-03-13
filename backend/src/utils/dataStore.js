const bcrypt = require('bcryptjs');

const now = () => new Date().toISOString();
const id = () => Math.random().toString(36).slice(2, 10);

const state = {
  users: [],
  services: [],
  products: [],
  blogs: [],
  gallery: [],
  contacts: [],
  team: [],
};

function seed() {
  if (state.users.length) return;
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin12345';
  const admin = {
    id: id(),
    name: 'Admin',
    email: process.env.ADMIN_EMAIL || 'admin@kavion.com',
    password: bcrypt.hashSync(adminPassword, 12),
    role: 'admin',
    createdAt: now(),
  };

  state.users.push(admin);

  state.services.push(
    {
      id: id(),
      category: 'Cybersecurity',
      title: 'VAPT & Security Testing',
      description: 'Comprehensive assessment for web, API, and infrastructure surfaces.',
      subServices: ['WAPT', 'API PT', 'SAST/DAST', 'Secure Code Review'],
      icon: 'ShieldCheck',
      order: 1,
    },
    {
      id: id(),
      category: 'Web Development',
      title: 'Full-Stack Product Engineering',
      description: 'Modern frontend and backend platforms optimized for performance.',
      subServices: ['Frontend Dev', 'Backend Dev', 'Server Management'],
      icon: 'Code2',
      order: 2,
    },
    {
      id: id(),
      category: 'Cloud Infrastructure',
      title: 'Secure Cloud Operations',
      description: 'Hardened AWS/GCP/Azure deployments with observability and governance.',
      subServices: ['Cloud Security', 'AWS', 'GCP', 'Azure'],
      icon: 'CloudCog',
      order: 3,
    }
  );

  state.products.push(
    {
      id: id(),
      name: 'KAVION Sentinel',
      description: 'Threat monitoring dashboard for SMEs.',
      category: 'Security',
      price: 199,
      imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
      cloudinaryId: null,
      isPublished: true,
      createdAt: now(),
    },
    {
      id: id(),
      name: 'KAVION Orbit',
      description: 'Managed cloud control plane starter kit.',
      category: 'Cloud',
      price: 299,
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
      cloudinaryId: null,
      isPublished: true,
      createdAt: now(),
    }
  );

  state.blogs.push({
    id: id(),
    title: 'Why Zero Trust Is Non-Negotiable in 2026',
    slug: 'why-zero-trust-is-non-negotiable-in-2026',
    content: '<p>Zero trust minimizes blast radius and improves visibility across distributed systems.</p>',
    thumbnail: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=1200&auto=format&fit=crop',
    tags: ['security', 'zero-trust'],
    category: 'Cybersecurity',
    author: 'KAVION Security Team',
    isPublished: true,
    createdAt: now(),
  });

  state.gallery.push({
    id: id(),
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop',
    cloudinaryId: null,
    category: 'Projects',
    caption: 'SOC modernization sprint',
    createdAt: now(),
  });

  state.team.push({
    id: id(),
    name: 'Aarav Patel',
    role: 'Head of Security',
    bio: 'Leads red team and governance practice.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    cloudinaryId: null,
    socialLinks: { linkedin: '', twitter: '', github: '' },
  });
}

seed();

module.exports = { state, id, now };
