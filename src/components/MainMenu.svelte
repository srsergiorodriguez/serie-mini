<script>
  import { base } from '$app/paths';
</script>

<nav>
  <ul class="menu-list no-select">
    <li><a href="{base}">Portada</a></li>
    <li><a href="{base}/pages">Explorar</a></li>
    <li><a href="{base}/tour">Tour</a></li>
    <li><a href="{base}/metadata">Metadatos</a></li>
  </ul>
</nav>

<style>
  .menu-list {
    display: flex;
    gap: 1em;
    justify-content: space-around;
  }

  .menu-list li {
    list-style-type: none
  }

  a {
    text-decoration: none;
    font-weight: bold;
    font-size: 1.2em;
    color: var(--stroke);
  }

  a:hover {
    color: var(--accent2);
  }
</style>