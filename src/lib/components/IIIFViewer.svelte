<script>
  import { onMount } from 'svelte';
  import { uniqueId } from '$lib/helpers';
  import { base } from '$app/paths';
  import { projectMetadata } from '$routes/data/metadata';
  import { dev } from '$app/environment';

  export let pid;

  const viewerID = uniqueId();

  const itemMetadata = projectMetadata.find(d => d.pid === pid);

  const tileSources = getTileSources(itemMetadata._images);

  function getTileSources(n) {
    const tileSources = [];
    for (let i = 0; i < n; i++) {
      const path = `${base}/iiif/${pid}/${i}/${dev ? "_info" : "info"}.json`;
      tileSources.push(path);
    }
    return tileSources
  }

  let viewer;
  onMount(() => {
    import('openseadragon').then(module => {
      const OpenSeadragon = module.default;
      viewer = OpenSeadragon({
        id: `osd-container-${viewerID}`,
        preload: false,
        sequenceMode: true,
        prefixUrl: `${base}/openseadragon/images/`,
        tileSources
      });
    }).catch(error => {
      console.error('Error loading OpenSeadragon:', error);
    });
  });
</script>

<div class="viewer-container">
  <div id="osd-container-{viewerID}" class="osd-container"></div>
  {#if itemMetadata.manifest !== undefined}
    <div class="manifest-link"><a href="{dev ? itemMetadata._manifest : itemMetadata.manifest}" target="_blank">IIIF Manifest</a></div>
  {/if}
</div>

<style>
  .viewer-container {
    border: 1px solid rgba(0,0,0,0.2);
    max-width: 100%;
    height: 500px;
    margin: auto;
  }

  .manifest-link {
    position: relative;
    bottom: 20px;
    right: 5px;
    text-align: right;
  }

  .osd-container {
    width: 100%;
    height: 100%;
  }
</style>