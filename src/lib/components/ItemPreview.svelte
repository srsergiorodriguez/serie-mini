<script>
  import { base } from '$app/paths';
  import { projectMetadata } from '$routes/data/metadata';
  import serieConfig from '$config/serie.config'

  export let pid;
  export let title = "";
  export let alt = "";
  export let page = 1;
  
  let found = projectMetadata.find(d => d.pid === pid);
  let label = "";
  if (found !== undefined) label = found.label;

</script>

{#if found && serieConfig.pages.iiifViewer}
  <div class="preview-item">
    <a href="{base}/pages/{pid}"><img src="{base}/iiif/{pid}/{page - 1}/full/512,/0/default.jpg" title={title} alt={alt === "" ? title : alt}/></a>
    <a class="silent-link" href="{base}/pages/{pid}">{found.label}</a>
    {#if title}<p><em>{title}</em></p>{/if}
  </div>
{:else}
INCORRECTO: REVISA EL PID | INCORRECT: CHECK THE PID OF THE IMAGE
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