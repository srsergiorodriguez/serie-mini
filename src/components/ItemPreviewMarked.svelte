<script>
  import { base } from '$app/paths';
  import { metadata } from '../routes/data/metadata';

  export let href = "";
  export let title = undefined;
  export let text = "";

  let formatedHref = href;
  let isPreview = false;
  if (/^\!/.test(href)) {
    formatedHref = formatedHref.replace(/^\!/, "");
    isPreview = true;
  }

</script>

{#if isPreview}
  <div class="preview-item">
    <a href="{base}/pages/{formatedHref}"><img src="{base}/data/raw_images/{formatedHref}.jpg" title={title} alt={text}/></a>
    <a class="silent-link" href="{base}/pages/{formatedHref}">{metadata.find(d => d.pid === formatedHref).label}</a>
  </div>
{:else}
  <img src={href} {title} alt={text} />
{/if}

<style>
  .preview-item {
    padding: 2em;
    border: 1px solid rgba(0,0,0,0.2);
    max-width: 500px;
    margin: auto;
  }

  img {
    width: 100%;
  }
  
</style>