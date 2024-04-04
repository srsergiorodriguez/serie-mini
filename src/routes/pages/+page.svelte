<script>
  import Page from '../../layouts/Page.svelte';
  import SearchBar from '../../components/SearchBar.svelte';
  import Gallery from '../../components/Gallery.svelte';

  import SvelteMarkdown from "svelte-markdown";
  import { mdData } from "./../data/md";
  const md = mdData.explore.body;

  let filters = mdData.explore.attributes.galleryFilters

  export let data;
</script>

<Page>
  <SvelteMarkdown source={md}/>
  <SearchBar />
  <Gallery metadata={data.metadata} {filters}/>
</Page>