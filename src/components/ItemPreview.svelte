<script>
  import { base } from '$app/paths';
  import { metadata } from '../routes/data/metadata';

  export let pid;
</script>

<div class="preview-item">
  <a href="{base}/pages/{pid}"><img src="{base}/data/raw_images/{pid}.jpg" alt=""/></a>
  <a class="silent-link" href="{base}/pages/{pid}">{metadata.find(d => d.pid === pid).label}</a>
</div>

<style>
  .preview-item {
    padding: 2em;
    border: 1px solid rgba(0,0,0,0.2);
    max-width: 50%;
    margin: auto;
  }

  img {
    width: 100%;
  }
</style>