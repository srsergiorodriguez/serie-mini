<script>
  import Page from '../../layouts/Page.svelte';

  import SvelteMarkdown from "svelte-markdown";
  import { mdData } from "./../data/md";
  const md = mdData.credits.body;

</script>

<Page>
  <SvelteMarkdown source={md} />
</Page>