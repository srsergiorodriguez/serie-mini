<script>
  import { arrayRange } from '$lib/helpers';
  import { t } from '$stores/translations';

  export let perPage;
  export let page;
  export let pagesNr;

  const pagesArr = arrayRange(0, pagesNr, 1);

  function changePage(e) {
    page = +e.target.value;
    console.log(page*25, (page+1) * perPage)
  }

  function movePage(v) {
    page += v;
    page = page < 0 ? 0 : page > pagesNr ? pagesNr : page;
  }
</script>

<div class="pager">
  <span>{$t.page}:</span>
  <button class="pager-button" disabled={page === 0 ? true : false} on:click={() => movePage(-1)}>{"<<"}</button>
  <select id="lang-selector" on:change={changePage}>
    {#each pagesArr as l}
      <option value={l} selected={l === page}>{l + 1}</option>
    {/each}
  </select>
  <button class="pager-button" disabled={page >= pagesNr ? true : false} on:click={() => movePage(1)}>{">>"}</button>
</div>

<style>
  .pager {
    font-size: 1.2em;
    padding: 0.2em 0;
    display: flex;
    justify-content: right;
    align-items: center;
  }

  .pager-button {
    border: none;
    background: none;
    cursor: pointer;
    font-size: 1.2em;
  }

  .pager-button:hover {
    color: var(--accent2);
  }

  .pager-button:disabled {
    color: lightgray;
  }
</style>