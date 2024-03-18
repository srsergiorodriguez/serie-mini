<script>
  import Page from '../../layouts/Page.svelte';
  import MetadataTable from '../../components/MetadataTable.svelte';
  import { metadata } from "../data/metadata";

  import SvelteMarkdown from "svelte-markdown";
  import { mdData } from "./../data/md";
  const md = mdData.metadata.body;
</script>

<Page>
  <SvelteMarkdown source={md} />
  <MetadataTable {metadata} />
</Page>