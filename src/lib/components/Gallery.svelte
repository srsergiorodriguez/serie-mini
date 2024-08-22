<script>
  import { base } from '$app/paths';
  import { sortAlpha } from '../helpers';
  import { t } from '$stores/translations';
  import Filter from './Filter.svelte';
  import Pager from './Pager.svelte';
  import serieConfig from '$config/serie.config';
  import { projectMetadata } from '$data/metadata.js';

  export let metadata = projectMetadata; // opcionalmente se pueden pasar otros datos prefiltrados
  export let filters = [];

  let filtered = metadata;
  let changed = false;

  let perPage = 28;
  let page = 0;
  let pagesNr = Math.ceil(filtered.length / perPage) - 1;
  $: if (changed) {
    page = 0
    changed = false;
  }
  
</script>

<h2>{$t.gallery}</h2>

<Filter bind:filtered {metadata} {filters} bind:changed />

{#if filtered.length > perPage}
  <Pager bind:page bind:perPage {pagesNr}/>
{/if}

<div class="preview-gallery">
  {#each sortAlpha(filtered, "label").slice(page * perPage, (page + 1) * perPage) as d (d.pid)}
    <div class="preview-item">
      {#if serieConfig.pages.iiifViewer && d._images > 0}
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
    gap: 1.5em;
  }

  .preview-item {
    display: flex;
    flex-direction: column;
    width: 256px;
    text-align: center;
  }

  .preview-item img {
    max-width: 200px;
    max-height: 200px;
    object-fit: cover;
    object-position: 100% 0;
  }

</style>