<script>
  import MainMenu from './MainMenu.svelte';
  import serieConfig from '$config/serie.config.js';
  import { base } from '$app/paths';

  const backgroundImage = serieConfig.banner !== undefined ? (/(^http)/.test(serieConfig.banner) ? serieConfig.banner : `${base}/${serieConfig.banner}`) : undefined;
</script>

<header class="main-header" style={`background-image: ${ backgroundImage !== undefined ? `url(${backgroundImage})` : "none"};`}>
  <div>
    <h1 class="main-title" id="main-title"><a href={base}>{serieConfig.title}</a></h1>
    <span class="main-subtitle">{serieConfig.subtitle}</span>
  </div>
  
  <MainMenu />
</header>

<style>
  a {
    text-decoration: none;
    color: var(--accent2);
  }

  .main-title {
    max-width: 600px;
    font-size: 5em;
    padding: 0;
    margin: 0;
  }

  .main-header {
    display: flex;
    padding: 1em;
    justify-content: space-around;
    align-items: end;
    background: var(--accent1);
    border: solid 1px var(--accent1);
    min-height: 200px;
    flex-direction: row;
  }

  @media screen and (max-width: 800px) {
    .main-header {
      flex-direction: column;
      text-align: center;
      align-items: center;
    }
  }
</style>