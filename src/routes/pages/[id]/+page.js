import { metadata } from '../../data/metadata.js';

export async function load({ params }) {
  const itemMetadata = metadata.find(d => d.pid === params.id);
  return {
      itemMetadata
  };
}

export const prerender = true;