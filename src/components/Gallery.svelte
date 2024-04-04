<script>
  import { base } from '$app/paths';
  import { sortAlpha } from '../helpers';
  import { blur } from 'svelte/transition';
  import { t } from '../stores/translations';
  import Filter from './Filter.svelte';
  import Pager from './Pager.svelte';
  import serieConfig from '../config/serie.config';

  export let metadata;
  export let filters;

  let filtered = metadata;

  let perPage = 28;
  let page = 0;
  let pagesNr = Math.ceil(filtered.length / perPage) - 1;
  
</script>

<h2>{$t.gallery}</h2>

<Filter bind:filtered {metadata} {filters} />

{#if filtered.length > perPage}
  <Pager bind:page bind:perPage {pagesNr}/>
{/if}

<div class="preview-gallery">
  {#each sortAlpha(filtered, "label").slice(page*perPage, (page+1) * perPage) as d (d.pid)}
    <div transition:blur={{ duration: 400 }} class="preview-item">
      {#if serieConfig.pages.iiifViewer}
        <a href="{base}/pages/{d.pid}"><img src="{base}/iiif/{d.pid}/0/full/256,/0/default.jpg" alt={d.label}/></a>
      {/if}
      <a class="silent-link" href="{base}/pages/{d.pid}">{d.label}</a>
    </div>
  {/each}
</div>

{#if filtered.length > perPage}
  <Pager bind:page bind:perPage {pagesNr}/>
{/if}


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