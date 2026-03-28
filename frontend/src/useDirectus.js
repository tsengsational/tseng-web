import { createDirectus, rest, readItems } from '@directus/sdk';

const client = createDirectus('http://127.0.0.1:8055').with(rest());

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
  return `http://127.0.0.1:8055/assets/${id}`;
}
