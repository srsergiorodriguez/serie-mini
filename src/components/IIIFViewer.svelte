<script>
  import { onMount } from 'svelte';
  import { uniqueId } from '../helpers';
  import { base } from '$app/paths';

  export let pid;

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
        tileSources: `${base}/iiif/${pid}/info.json`

      });
    }).catch(error => {
      console.error('Error loading OpenSeadragon:', error);
    });
  });
</script>

<div class="viewer-container">
  <div id="osd-container-{viewerID}" class="osd-container"></div>
</div>


<style>
  .viewer-container {
    border: 1px solid rgba(0,0,0,0.2);
    max-width: 100%;
    height: 500px;
    margin: auto;
  }

  .osd-container {
    width: 100%;
    height: 100%;
  }
</style>