<script>
  import { base } from '$app/paths';
</script>

<nav>
  <ul class="menu-list no-select">
    <li><a class="silent-link" href="{base}">Portada</a></li>
    <li><a class="silent-link" href="{base}/pages#main-title">Explorar</a></li>
    <li><a class="silent-link" href="{base}/tour#main-title">Tour</a></li>
    <li><a class="silent-link" href="{base}/metadata#main-title">Metadatos</a></li>
  </ul>
</nav>

<style>
  .menu-list {
    display: flex;
    gap: 1em;
    justify-content: space-around;
    padding: 0;
    margin: 0;
  }

  .menu-list li {
    
    list-style-type: none;
    font-size: 1.2em;
  }
</style>