<script>
  import lunr from 'lunr';
  import serieConfig from '../config/serie.config.js';
  import { uniqueId } from '../helpers';
  import { searchIndex } from '../routes/data/searchIndex';
  import { metadata } from '../routes/data/metadata';
  import { base } from '$app/paths';

  const searchBarId = uniqueId();
  const lunarIndex = lunr.Index.load(searchIndex);
  const indexedKeys = serieConfig.pages.metadataToIndex.length <= 0 ? Object.keys(metadata[0]) : serieConfig.pages.metadataToIndex;

  let resultsList = undefined;

  let searchString = "";

  function searchTerm(e) {
    searchString = e.target.value;
    if (searchString === "") {
      resultsList = [];
      return
    }
    const lunrResult = lunarIndex.search(e.target.value);
    resultsList = lunrResult.map(d  => metadata.find(m => m.pid === d.ref));
  }
</script>

<div>
  <label for="search-bar-{searchBarId}">Buscar: </label>
  <input
    class="search-bar"
    id="search-bar-{searchBarId}"
    name="search-bar-{searchBarId}"
    placeholder=""
    type="text"
    on:input={searchTerm}
  />
  
  {#if searchString !== ""}
    <p>{resultsList.length} resultado{resultsList.length > 1 || resultsList.length <= 0 ? "s" : ""}.</p>

    <div class="resultsList-preview">
      {#each resultsList as result}
        <div class="result-preview">
          <div class="result-thumb">
            <a href="{base}/pages/{result.pid}"><img src="{base}/thumbs/{result.pid}.jpg" alt=""/></a>
          </div>
          <div class="result-metadata">
            <a class="silent-link" href="{base}/pages/{result.pid}">{result.label}</a>
            <div>
              {#each indexedKeys as key}
                <span class="metadata-item"><span class="metadata-key">{key}: </span><span>{result[key]} | </span></span>
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
  
</div>

<style>
  label {
    font-size: 1.5em;
  }

  .search-bar {
    outline: 0;
    width: 50%;
    padding: 0.2em;
    margin-top: 1em;
    font-size: 2em;
    border: none;
    border-bottom: 1px solid var(--stroke);
    background: var(--fill);
  }

  .search-bar:focus {
    border: none;
    border-bottom: var(--accent2) 4px solid;
    outline: 0px solid #000;
  }

  .resultsList-preview {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 0.5em;
  }

  .result-preview {
    display: flex;
    gap: 1em;
    align-items: center;
  }

  .result-thumb {
    width: 128px;
  }

  .result-thumb img {
    width: 100%;
  }

  .metadata-key {
    font-weight: bold;
  }

  .metadata-item {
    display: inline;
    gap: 1em;
    justify-content: left;
    list-style-type: none;
    padding: 0;
  }
</style>