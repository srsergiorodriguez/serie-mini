<script>
  import { base } from '$app/paths';
  export let metadata;
  export let name;
</script>

<h2>{name}</h2>

<div class="metadata-table-container">
  <table class="metadata-table">
    <tr>
      {#each Object.keys(metadata[0]) as h}
        <th>{h}</th>
      {/each}
    </tr>
    {#each metadata as row}
      <tr>
        {#each Object.values(row) as d}
          <td>{d}</td>
        {/each}
      </tr>
    {/each}
  </table>
</div>

<div class="button-container">
  <a download target="_blank" rel="noreferrer" href={`${base}/data/metadata.csv`}><button class="default-button">Descargar CSV</button></a>
</div>

<style>
  .metadata-table-container {
    border-bottom: 1px solid rgba(0,0,0,0.2);
    max-height: 700px;
    max-width: 100%;
    overflow: scroll;
  }
</style>