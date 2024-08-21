<script>
  import { base } from '$app/paths';
  import serieConfig from '$config/serie.config.js';
</script>

<footer class="main-footer">
  <div>
    <a href="{base}/credits"><p>{serieConfig.credits}</p></a>
    <span>Colección creada con <a href="https://github.com/srsergiorodriguez/serie-mini" target="_blank">Serie Mini</a></span>
  </div>
  <div>
    <p class="main-title no-select">{serieConfig.copyright}</p>
    <div class="logos-container">
      {#if serieConfig.logos !== undefined}
        {#each serieConfig.logos as {img, link}}
          <div class="logo">
            <a href={link} target="_blank">
              <img src={/(^http)/.test(img) ? img : `${base}/${img}`} alt="logo"/>
            </a>
          </div>
        {/each}
      {/if}
    </div>
  </div>
</footer>

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
      text-align: left;
    }
  }

  .logos-container {
    display: flex;
    gap: 0.5em;
  }

  .logo {
    max-width: 300px;
  }

  .logo img {
    width: 100%;
  }
</style>