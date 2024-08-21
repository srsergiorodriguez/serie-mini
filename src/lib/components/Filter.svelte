<script>
  import { t } from '$stores/translations';

  export let metadata;
  export let filters;
  export let changed = false;

  export let filtered = metadata;

  let filterList = filters.map(() => "");

  function setFilter(e, i) {
    filterList[i] = e.target.value;
    applyFilter();
  }

  function reset() {
    filterList = filterList.map(() => "");
    [...document.getElementsByClassName("selector-filter")].forEach(e => e.selectedIndex = 0);
    applyFilter();
  }

  function applyFilter() {
    changed = true;
    filtered = metadata;
    for (let i = 0; i < filterList.length; i++) {
      filtered = filtered.filter(d => {
        if (filterList[i] === "") return true
        // return `${d[filters[i]]}` === filterList[i];
        return `${d[filters[i]]}`.includes(filterList[i])
      })
    }
  }

  function getOptions(f) {
    let options = [];
    for (let d of filtered) {
      const splitted = `${d[f]}`.split(/,[ ]?/);
      options = [...options, ...splitted];
    }
    return [... new Set(options)].sort()
  }
</script>

<div class="filter-container no-select">
  {$t.filters}:
  {#each filters as f, i}
    <div>
      <span>{f}: </span>
      <select id={`selectorFilter_${f}_${i}`} class="selector-filter" on:change={e => setFilter(e, i)}>
        <option value={""} selected>{$t.all}</option>
        {#each getOptions(f) as fe}
          <option value={fe}>{fe}</option>
        {/each}
      </select>
    </div>
  {/each}
  
  <button class="reset-button" on:click={reset}><img src='./icons/reset.png' alt='reset'></button>
</div>

<style>
  .filter-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border: solid 1px var(--accent1);
    padding: 10px;
    margin-bottom: 1em;
    font-size: 1.2em;
  }

  select {
    font-size: 0.8em;
  }
</style>