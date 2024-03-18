<script>
  import serieConfig from '../config/serie.config.js';
</script>

<header class="main-footer">
  <p class="main-title no-select">{serieConfig.credits}</p>
  <p class="main-title no-select">{serieConfig.copyright}</p>
</header>

<style>
  .main-footer {
    display: flex;
    padding: 1em;
    justify-content: space-around;
    align-items: center;
    background: var(--accent1);
    border: solid 1px var(--accent1);
  }
</style>