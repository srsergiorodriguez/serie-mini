import { metadata } from '../data/metadata.js';

export async function load({ params }) {
  return {
      metadata
  };
}

export const prerender = true;