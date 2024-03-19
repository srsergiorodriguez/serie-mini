<script>
  import { base } from '$app/paths';
  import serieConfig from '../config/serie.config.js';
</script>

<header class="main-footer">
  <a href="{base}/credits"><p class="main-title no-select">{serieConfig.credits}</p></a>
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
    flex-direction: row;
  }

  @media screen and (max-width: 800px) {
    .main-footer {
      flex-direction: column;
      align-items: start;
      text-align: right;
    }
  }
</style>