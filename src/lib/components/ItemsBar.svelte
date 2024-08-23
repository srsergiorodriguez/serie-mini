<script>
  import serieConfig from '$config/serie.config';
  import { base } from '$app/paths';
  import { fade } from 'svelte/transition';

  export let items = [];
</script>

{#if items.length > 0}
  <div transition:fade={{ duration: 200 }} class="items-bar">
      {#each items as d (d.pid)}
        <div class="work-preview no-select">
          {#if serieConfig.pages.iiifViewer}
            <a class="thumb" href="{base}/pages/{d.pid}"><img class="noevents" src="{base}/iiif/{d.pid}/0/full/256,/0/default.jpg" alt={d.label}/></a>
          {/if}
          <a href="{base}/pages/{d.pid}"><span>{d.label}</span></a>
        </div>
      {/each}
  </div>
{/if}

<style>
  .items-bar {
    padding: 1em;
    display: flex;
    gap: 1em;
    overflow-x: scroll;
    border: solid 1px var(--accent1);
  }

  .work-preview {
    display: flex;
    flex-direction: column;
    max-width: 130px;
    font-size: 0.8em;
  }

  .thumb {
    height: 100px;
    width: 130px;
    object-fit: contain;
  }

  .thumb img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
</style>