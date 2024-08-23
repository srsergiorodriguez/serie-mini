<script>
  import { base } from '$app/paths';
  import serieConfig from '$config/serie.config';
  import { projectMetadata } from '$data/metadata.js';

  export let metadata = projectMetadata;
  export let direction = "row";
  export let itemsNr = 3;

  const selectNr = Math.min(itemsNr, metadata.length);
  const selected = getSelection(metadata);
  
  function getSelection(arr) {
    const selected = [];
    while (selected.length < selectNr) {
      const rnd = Math.floor(Math.random() * metadata.length);
      if (!selected.includes(rnd)) {
        selected.push(rnd);
      }
    }
    return selected.map(d => arr[d])
  }

</script>

<div class="preview-carousel" style={`--direction:${direction}`}>
  {#each selected as d (d.pid)}
    <div class="preview-item">
      {#if serieConfig.pages.iiifViewer && d._images > 0}
        <a href="{base}/pages/{d.pid}"><img src="{base}/iiif/{d.pid}/0/full/256,/0/default.jpg" alt={d.label}/></a>
      {/if}
      <a class="silent-link" href="{base}/pages/{d.pid}">{d.label}</a>
    </div>
  {/each}
</div>

<style>
  .preview-carousel {
    display: flex;
    flex-wrap: wrap;
    flex-direction: var(--direction);
    justify-content: space-evenly;
    gap: 1.5em;
    overflow: scroll;
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