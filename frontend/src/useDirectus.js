import { createDirectus, rest, readItems } from '@directus/sdk';

const DIRECTUS_URL = import.meta.env.VITE_DIRECTUS_URL || 'http://127.0.0.1:8055';
const client = createDirectus(DIRECTUS_URL).with(rest());

// Curated default projects representing Jason Tseng's triad portfolio
const FALLBACK_PROJECTS = [
  // WRITER
  {
    id: 'wrt-01',
    title: 'The Cartographer of Fractured Realities',
    description: 'An expansive speculative novella probing computational memory, diaspora geography, and synthetic ancestry in high-density urban colonies.',
    role: 'Writer',
    is_featured: true,
    year: '2025',
    link: 'https://jasontseng.substack.com/',
    tags: [{ tags_id: { name: 'Speculative Fiction' } }, { tags_id: { name: 'Essay' } }, { tags_id: { name: 'Diaspora' } }]
  },
  {
    id: 'wrt-02',
    title: 'Dramaturgy of the Machine Mind',
    description: 'Full-length stage play examining human rehearsal practices when performing alongside emergent artificial speech synthetics.',
    role: 'Writer',
    is_featured: true,
    year: '2024',
    link: 'https://newplayexchange.org',
    tags: [{ tags_id: { name: 'Playwriting' } }, { tags_id: { name: 'Theater' } }, { tags_id: { name: 'NPX' } }]
  },
  {
    id: 'wrt-03',
    title: 'Notes from the Liminal Terminal',
    description: 'Bimonthly cultural criticism exploring how queer subcultures build enduring ritual spaces inside temporary software platforms.',
    role: 'Writer',
    is_featured: true,
    year: '2025',
    link: 'https://jasontseng.substack.com/',
    tags: [{ tags_id: { name: 'Substack' } }, { tags_id: { name: 'Cultural Criticism' } }]
  },

  // ARTIST
  {
    id: 'art-01',
    title: 'Chroma-Topology: Simplex Topographies',
    description: 'Generative chromatic series investigating topological deformation through continuous WebGL surface noise and raymarched lighting.',
    role: 'Artist',
    is_featured: true,
    year: '2025',
    tags: [{ tags_id: { name: 'Generative Art' } }, { tags_id: { name: 'Three.js' } }, { tags_id: { name: 'GLSL' } }]
  },
  {
    id: 'art-02',
    title: 'Gouache & Blueprint Monotypes',
    description: 'Series of physical hand-pulled cyanotypes overprinted with architectural drafting gouache, mapping urban architectural remnants.',
    role: 'Artist',
    is_featured: true,
    year: '2024',
    tags: [{ tags_id: { name: 'Printmaking' } }, { tags_id: { name: 'Cyanotype' } }, { tags_id: { name: 'Mixed Media' } }]
  },
  {
    id: 'art-03',
    title: 'Somatic Vectors & Kinetic Gestures',
    description: 'Large-scale ink plotter drawings created by tracking bodily movement and dance choreography with computer vision sensors.',
    role: 'Artist',
    is_featured: true,
    year: '2025',
    tags: [{ tags_id: { name: 'Plotter Drawings' } }, { tags_id: { name: 'Choreography' } }]
  },

  // CODER
  {
    id: 'cdr-01',
    title: 'Simplex Shadergradient Engine',
    description: 'Custom high-performance WebGL simplex noise deformation pipeline with dynamic color linear blending and 60fps viewport responsiveness.',
    role: 'Coder',
    is_featured: true,
    year: '2025',
    tags: [{ tags_id: { name: 'Three.js' } }, { tags_id: { name: 'WebGL' } }, { tags_id: { name: 'Vue 3' } }]
  },
  {
    id: 'cdr-02',
    title: 'Atelier Headless CMS Architecture',
    description: 'Decoupled content orchestration utilizing Directus REST API, PostgreSQL, and continuous Dockerized Railway infrastructure.',
    role: 'Coder',
    is_featured: true,
    year: '2024',
    tags: [{ tags_id: { name: 'Directus' } }, { tags_id: { name: 'Docker' } }, { tags_id: { name: 'PostgreSQL' } }]
  },
  {
    id: 'cdr-03',
    title: 'Substack RSS Ingestion & Parser',
    description: 'Real-time asynchronous feed parsing engine translating RSS XML into structured reactive articles with fallback caching.',
    role: 'Coder',
    is_featured: true,
    year: '2025',
    tags: [{ tags_id: { name: 'API' } }, { tags_id: { name: 'JavaScript' } }, { tags_id: { name: 'RSS' } }]
  }
];

export async function fetchFeaturedProjects() {
  try {
    const projects = await client.request(
      readItems('projects', {
        filter: {
          is_featured: { _eq: true }
        },
        fields: ['*', 'tags.tags_id.name'],
      })
    );
    if (projects && projects.length > 0) {
      return projects;
    }
    return FALLBACK_PROJECTS;
  } catch (error) {
    console.warn('Directus offline or unreachable, serving curated atelier projects:', error.message || error);
    return FALLBACK_PROJECTS;
  }
}

export async function fetchAllProjects() {
  try {
    const projects = await client.request(
      readItems('projects', {
        fields: ['*', 'tags.tags_id.name'],
      })
    );
    if (projects && projects.length > 0) {
      return projects;
    }
    return FALLBACK_PROJECTS;
  } catch (error) {
    console.warn('Directus offline, serving curated projects:', error.message || error);
    return FALLBACK_PROJECTS;
  }
}

export async function fetchProjectsByRole(role) {
  try {
    const projects = await client.request(
      readItems('projects', {
        filter: {
          role: { _eq: role }
        },
        fields: ['*', 'tags.tags_id.name'],
      })
    );
    if (projects && projects.length > 0) {
      return projects;
    }
    return FALLBACK_PROJECTS.filter(p => p.role.toLowerCase() === role.toLowerCase());
  } catch (error) {
    console.warn(`Directus offline for role ${role}, serving curated projects:`, error.message || error);
    return FALLBACK_PROJECTS.filter(p => p.role.toLowerCase() === role.toLowerCase());
  }
}

export function getImageUrl(id) {
  if (!id) return '';
  if (id.startsWith('http') || id.startsWith('/')) return id;
  const DIRECTUS_URL = import.meta.env.VITE_DIRECTUS_URL || 'http://127.0.0.1:8055';
  return `${DIRECTUS_URL}/assets/${id}`;
}
