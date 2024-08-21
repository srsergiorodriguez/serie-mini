<script>
  import { lang } from "$stores/translations";
  import serieConfig from '$config/serie.config';
  $lang = serieConfig.lang;
</script>

<section class="general">
  <slot></slot>
</section>