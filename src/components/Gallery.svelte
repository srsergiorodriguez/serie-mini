<script>
  import { base } from '$app/paths';
  import { sortAlpha } from '../helpers';
  import { blur } from 'svelte/transition';
  import Filter from './Filter.svelte';

  export let metadata;
  export let filters;
  export let name;

  let filtered = metadata;

</script>

<h2>{name}</h2>

<Filter bind:filtered {metadata} {filters} />

<div class="preview-gallery">
  {#each sortAlpha(filtered, "label") as d,i (i)}
    <div transition:blur={{ duration: 400 }} class="preview-item">
      <a href="{base}/pages/{d.pid}"><img src="{base}/iiif/{d.pid}/full/256,/0/default.jpg" alt={d.label}/></a>
      <a class="silent-link" href="{base}/pages/{d.pid}">{d.label}</a>
    </div>
  {/each}
</div>

<style>
  .preview-gallery {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 1em;
  }

  .preview-item {
    display: flex;
    flex-direction: column;
    max-width: 256px;
    max-height: 256px;
  }

  .preview-item img {
    width: 256px;
    height: 200px;
    object-fit: cover;
    object-position: 100% 0;
  }

</style>