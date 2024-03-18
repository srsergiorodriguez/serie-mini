<script>
  import serieConfig from '../config/serie.config';
  const pagesConfig = serieConfig.pages;

  export let itemMetadata;
</script>

<div class="metadata-card">
  <ul>
    {#each pagesConfig.metadataToShow as {key, label, type} (key)}
      {#if type === "text"}
        <li class="metadata-item"><span class="metadata-key">{label}:</span><span>{itemMetadata[key]}</span></li>
      {:else if type === "link"}
        <li class="metadata-item"><a class="metadata-key" href={itemMetadata[key]} target="_blank">{label}</a></li>
      {/if}
    {/each}
  </ul>
</div>

<style>
  .metadata-card {
    border: 1px solid rgba(0,0,0,0.2);
    max-width: 100%;
    margin: auto;
    margin-top: 1em;
  }

  .metadata-item {
    display: flex;
    gap: 1em;
    justify-content: left;
    list-style-type: none;
  }

  .metadata-key, a {
    color: var(--accent2);
    font-weight: bold;
  }

</style>