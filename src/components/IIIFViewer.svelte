<script>
  import { onMount } from 'svelte';
  import { uniqueId } from '../helpers';
  import { base } from '$app/paths';
  import { metadata } from '../routes/data/metadata';
  import { dev } from '$app/environment';

  export let pid;

  const itemMetadata = metadata.find(d => d.pid === pid);

  const viewerID = uniqueId();

  let viewer;
  onMount(() => {
    import('openseadragon').then(module => {
      const OpenSeadragon = module.default;
      viewer = OpenSeadragon({
        id: `osd-container-${viewerID}`,
        preload: true,
        // sequenceMode: true,
        prefixUrl: `${base}/openseadragon/images/`,
        tileSources: `${base}/iiif/${pid}/info${dev ? "_dev" : ""}.json`

      });
    }).catch(error => {
      console.error('Error loading OpenSeadragon:', error);
    });
  });
</script>

<div class="viewer-container">
  <div id="osd-container-{viewerID}" class="osd-container"></div>
  {#if itemMetadata.manifest !== undefined}
    <div class="manifest-link"><a href="{dev ? itemMetadata.manifest_dev : itemMetadata.manifest}" target="_blank">IIIF Manifest</a></div>
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