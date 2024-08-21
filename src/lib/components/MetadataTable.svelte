<script>
  import { t } from '$stores/translations';
  import { projectMetadata } from "$data/metadata";
  export let metadata = projectMetadata;

  const metadataFiltered = metadata.map(d => {
    const filtered = {};
    for (let [key, value] of Object.entries(d)) {
      if (!(/^_/.test(key))) filtered[key] = value;
    }
    return filtered
  });

  function downloadMetadata() {
    const separator = ","
    let str = [Object.keys(metadataFiltered[0]).join(separator)]
    for (let d of metadataFiltered) {
      str.push(Object.values(d).map(e => (new RegExp(`${separator}`)).test(e) ? `"${e}"` : e).join(separator));
    }
    str = str.join("\n");

    const link = document.createElement("a");
    const file = new Blob([str], {type: "text/plain"});
    link.href = URL.createObjectURL(file);
    link.download = "metadata.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  }

</script>

<h2>{$t.metadataTable}</h2>

<div class="metadata-table-container">
  <table class="metadata-table">
    <tr>
      {#each Object.keys(metadataFiltered[0]) as h}
        <th>{h}</th>
      {/each}
    </tr>
    {#each metadataFiltered as row}
      <tr>
        {#each Object.values(row) as d}
          <td>{d}</td>
        {/each}
      </tr>
    {/each}
  </table>
</div>

<div class="button-container">
  <button class="default-button" on:click={downloadMetadata}>{$t.download} CSV</button>
</div>

<style>
  .metadata-table-container {
    border-bottom: 1px solid rgba(0,0,0,0.2);
    max-height: 700px;
    max-width: 100%;
    overflow: scroll;
  }
</style>