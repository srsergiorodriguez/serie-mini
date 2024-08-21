<script>
  import lunr from 'lunr';
  import serieConfig from '$config/serie.config';
  import { fade } from 'svelte/transition';
  import { uniqueId } from '$lib/helpers';
  import { searchIndex } from '$routes/data/searchIndex';
  import { projectMetadata } from '$data/metadata';
  import { base } from '$app/paths';
  import { t } from '$stores/translations.js';

  import Pager from './Pager.svelte';

  const searchBarId = uniqueId();
  const lunarIndex = lunr.Index.load(searchIndex);
  const indexedKeys = serieConfig.pages.metadataToIndex.length <= 0 ? Object.keys(projectMetadata[0]) : serieConfig.pages.metadataToIndex;

  let resultsList = undefined;
  let searchString = "";

  let page = 0;
  let perPage = 8;
  let pagesNr = 0;

  function searchTerm(e) {
    page = 0;
    searchString = e.target.value;
    if (searchString === "") {
      resultsList = [];
      return
    }

    const searchFormatted = e.target.value;
    const lunrResult = lunarIndex.search(searchFormatted);
    resultsList = lunrResult.map(d  => projectMetadata.find(m => m.pid === d.ref));
    pagesNr = Math.ceil(resultsList.length / perPage) - 1;
  }
</script>

<div class="search-bar-container">
  <label for="search-bar-{searchBarId}">{$t.search}: </label>
  <input
    class="search-bar"
    id="search-bar-{searchBarId}"
    name="search-bar-{searchBarId}"
    placeholder=""
    type="text"
    on:input={searchTerm}
  />
  
  {#if searchString !== ""}
    <p>{resultsList.length} {resultsList.length > 1 || resultsList.length <= 0 ? $t.results.toLowerCase() : $t.result.toLowerCase()}.</p>

    {#if resultsList !== undefined}
      {#if resultsList.length > perPage}
        <Pager bind:page bind:perPage {pagesNr}/>
      {/if}
    {/if}

    <div class="resultsList-preview">
      {#each resultsList.slice(page*perPage, (page+1) * perPage) as result (result.pid)}
        <div transition:fade={{ duration: 300 }} class="result-preview">
          {#if serieConfig.pages.iiifViewer && result._images > 0}
            <div class="result-thumb">
              <a href="{base}/pages/{result.pid}"><img src="{base}/iiif/{result.pid}/0/full/256,/0/default.jpg" alt={result.label}/></a>
            </div>
          {/if}
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

  .search-bar-container {
    border: solid 1px var(--accent1);
    padding: 1em;
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
    grid-template-columns: 1fr 1fr;
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