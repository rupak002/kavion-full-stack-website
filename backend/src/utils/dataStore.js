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
      id: '1',
      title: 'Cybersecurity',
      description: 'Penetration testing, VAPT, threat modeling, and incident response for modern infrastructure.',
      icon: 'ShieldCheck',
      subServices: [
        'Vulnerability Assessment and Penetration Testing',
        'Web Application Penetration Testing',
        'API Pentest',
        'Cloud Penetration Testing',
        'Network Penetration Testing',
        'Mobile App Pentest',
        'Endpoint Audit',
        'SAST/DAST',
        'Secure Code Review',
      ],
      order: 1,
    },
    {
      id: '2',
      title: 'Cloud Infrastructure',
      description: 'AWS, GCP, Azure architecture, migration, and 24/7 cloud ops with zero-downtime SLAs.',
      icon: 'CloudCog',
      subServices: [
        'AWS Architecture',
        'GCP Migration',
        'Azure DevOps',
        'Cloud Security',
      ],
      order: 2,
    },
    {
      id: '3',
      title: 'Web Engineering',
      description: 'Scalable full-stack development with React, Next.js, Node.js, and modern toolchains.',
      icon: 'Code2',
      subServices: [
        'Frontend Development',
        'Backend Development',
      ],
      order: 3,
    },
    {
      id: '4',
      title: 'Digital Marketing',
      description: 'SEO, content strategy, and conversion-focused campaigns that drive sustainable growth.',
      icon: 'BarChart3',
      subServices: [
        'Technical SEO',
        'Logos',
        'Branding',
      ],
      order: 4,
    },
    {
      id: '5',
      title: 'UI/UX Design',
      description: 'User-centered design systems that convert. Built for accessibility and scalability.',
      icon: 'Globe',
      subServices: [
        'Web Design',
        'Application Design',
        'UX Research',
        'Content Design',
        'Visual Design',
      ],
      order: 5,
    },
    {
      id: '6',
      title: 'Compliance & Audit',
      description: 'ISO 27001, SOC 2, GDPR compliance preparation, gap analysis, and ongoing auditing.',
      icon: 'Lock',
      subServices: [
        'ISO 27001',
        'SOC 2 Type II',
        'GDPR Compliance',
        'Security Audit',
        'Risk Assessment',
      ],
      order: 6,
    },
    {
      id: '7',
      title: 'Infrastructure as a Service',
      description: 'Managed infrastructure including endpoint protection, OS hardening, server management, and firewall configuration.',
      icon: 'Lock',
      subServices: [
        'Endpoint',
        'SaaS',
        'OS Hardening',
        'Server Management',
        'NAS/SAN',
        'Firewall',
      ],
      order: 7,
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
