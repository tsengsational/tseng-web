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
        fields: ['*', 'tags.tags_id.name'],
      })
    );
    return projects;
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
}

export async function fetchAllProjects() {
  try {
    const projects = await client.request(
      readItems('projects', {
        fields: ['*', 'tags.tags_id.name'],
      })
    );
    return projects;
  } catch (error) {
    console.error('Error fetching all projects:', error);
    return [];
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
    return projects;
  } catch (error) {
    console.error(`Error fetching projects for role ${role}:`, error);
    return [];
  }
}

export function getImageUrl(id) {
  if (!id) return '';
  const DIRECTUS_URL = import.meta.env.VITE_DIRECTUS_URL || 'http://127.0.0.1:8055';
  return `${DIRECTUS_URL}/assets/${id}`;
}
