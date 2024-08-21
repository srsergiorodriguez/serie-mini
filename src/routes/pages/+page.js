import { projectMetadata } from '$data/metadata.js';

export async function load({ params }) {
  return {
    projectMetadata
  };
}

export const prerender = true;