<script>
  import Page from '../../layouts/Page.svelte';
  import ItemPreviewMarked from '../../components/ItemPreviewMarked.svelte';

  import SvelteMarkdown from "svelte-markdown";
  import { mdData } from "./../data/md";
  const md = mdData.tour.body;
</script>

<Page>
  <SvelteMarkdown source={md} renderers={{ image: ItemPreviewMarked }} />
</Page>