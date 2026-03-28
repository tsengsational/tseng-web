import { createDirectus, rest, readItems } from '@directus/sdk';

const DIRECTUS_URL = import.meta.env.VITE_DIRECTUS_URL || 'http://127.0.0.1:8055';
const client = createDirectus(DIRECTUS_URL).with(rest());

export async function fetchFeaturedProjects() {
  try {
    const projects = await client.request(
      readItems('projects', {
        filter: {
          is_featured: { _eq: true }
        },
        fields: ['*'],
      })
    );
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export function getImageUrl(id) {
  if (!id) return '';
  const DIRECTUS_URL = import.meta.env.VITE_DIRECTUS_URL || 'http://127.0.0.1:8055';
  return `${DIRECTUS_URL}/assets/${id}`;
}
