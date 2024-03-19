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
      <a href="{base}/pages/{d.pid}"><img src="{base}/thumbs/{d.pid}.jpg" alt=""/></a>
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
  }

  .preview-item img {
    width: 100%;
  }

</style>