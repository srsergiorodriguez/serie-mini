<script>
  import { base } from '$app/paths';
  import { sortAlpha } from '../helpers';

  export let metadata
</script>

<h1>Galería</h1>
<div class="preview-gallery">
  {#each sortAlpha(metadata, "label") as d}
    <div class="preview-item">
      <a href="{base}/pages/{d.pid}"><img src="{base}/thumbs/{d.pid}.jpg" alt=""/></a>
      <a href="{base}/pages/{d.pid}">{d.label}</a>
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

  a {
    color: var(--accent2);
    font-weight: bold;
  }

</style>