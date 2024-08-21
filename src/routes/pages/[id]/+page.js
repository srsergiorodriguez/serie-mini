import { projectMetadata } from '$data/metadata.js';

export async function load({ params }) {
  const itemMetadata = projectMetadata.find(d => d.pid === params.id);
  return {
      itemMetadata
  };
}

export const prerender = true;