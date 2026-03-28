const { createDirectus, rest, authentication, createCollection, createField, createItems, readCollections, readFields, readItems, readPermissions, createPermission } = require('@directus/sdk');

async function setup() {
  const url = process.env.DIRECTUS_URL || 'http://127.0.0.1:8055';
  const client = createDirectus(url).with(rest()).with(authentication());
  
  // Wait for directus to be ready
  let ready = false;
  while (!ready) {
    try {
      await client.request(() => ({ path: '/server/ping', method: 'GET' }));
      ready = true;
      console.log('Directus is ready!');
    } catch (e) {
      console.log('Waiting for Directus...');
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  try {
    await client.login('jason.f.tseng@gmail.com', 'dancer08');
  } catch (err) {
    console.error('Login failed:', err.message || err.errors?.[0]?.message || err);
    return;
  }

  // Helper to handle "already exists" errors
  const tryRequest = async (action, description) => {
    try {
      await client.request(action);
      console.log(`${description} successful.`);
    } catch (error) {
      const msg = error.errors?.[0]?.message || error.message || '';
      if (msg.includes('already exists') || msg.includes('unique constraint')) {
        console.log(`${description} skipped (already exists).`);
      } else {
        console.warn(`Warning during ${description.toLowerCase()}:`, msg);
      }
    }
  };

  try {
    console.log('Starting setup...');
    
    await tryRequest(createCollection({
      collection: 'projects',
      schema: { name: 'projects' },
      meta: { collection: 'projects', icon: 'cases' }
    }), 'Creating projects collection');
    
    const fields = [
      { field: 'title', type: 'string', meta: { interface: 'input' } },
      { field: 'description', type: 'text', meta: { interface: 'textarea' } },
      { field: 'image', type: 'uuid', schema: { foreign_key_table: 'directus_files', foreign_key_column: 'id' }, meta: { interface: 'file-image' } },
      { field: 'role', type: 'string', meta: { interface: 'select-dropdown', options: { choices: [{text: 'Writer', value: 'Writer'}, {text: 'Artist', value: 'Artist'}, {text: 'Coder', value: 'Coder'}] } } },
      { field: 'is_featured', type: 'boolean', meta: { interface: 'boolean' } },
      { field: 'link', type: 'string', meta: { interface: 'input' } },
      { field: 'content', type: 'json', meta: { interface: 'block-editor' } }
    ];

    for (const f of fields) {
      await tryRequest(createField('projects', f), `Creating field ${f.field}`);
    }

    const defaultContent = {
      blocks: [
        { type: 'header', data: { text: 'The Creative Challenge', level: 2 } },
        { type: 'paragraph', data: { text: 'Balancing technical constraints with the Editorial aesthetic requested in the initial brief. This project required a custom-built headless architecture to deliver content with millisecond precision across global regions.' } }
      ]
    };

    await tryRequest(createItems('projects', [
      {
        title: 'Fear & Wonder',
        description: 'A theatrical play script exploring human emotions.',
        content: defaultContent,
        role: 'Writer',
        is_featured: true,
        link: 'https://example.com/fear-wonder'
      },
      {
        title: 'Family Dinner',
        description: 'A dramatic one-act play about family dynamics.',
        content: defaultContent,
        role: 'Writer',
        is_featured: true,
        link: 'https://example.com/family-dinner'
      },
      {
        title: 'Ocean Surface Watercolor',
        description: 'Physical watercolor paintings of the ocean surface.',
        content: defaultContent,
        role: 'Artist',
        is_featured: true,
        link: 'https://example.com/ocean-watercolor'
      },
      {
        title: 'Amigurumi Octopus Pattern',
        description: 'A cute crochet pattern for an amigurumi octopus.',
        content: defaultContent,
        role: 'Artist',
        is_featured: true,
        link: 'https://example.com/amigurumi'
      },
      {
        title: 'Palettable Vue',
        description: 'A Vue-based color palette generator.',
        content: defaultContent,
        role: 'Coder',
        is_featured: true,
        link: 'https://example.com/palettable'
      },
      {
        title: '3D to Amigurumi Converter',
        description: 'Frontend application to convert 3D models into crochet patterns.',
        content: defaultContent,
        role: 'Coder',
        is_featured: true,
        link: 'https://example.com/3d-amigurumi'
      }
    ]), 'Inserting seed data');
    
    await tryRequest(createPermission({
      role: null, // Public role
      collection: 'projects',
      action: 'read',
      permissions: {},
      validation: null,
      presets: null,
      fields: ['*']
    }), 'Updating public permissions');

    console.log('Setup finished!');
  } catch (error) {
    console.error('Fatal error during setup:', error.message);
  }
}

setup();
