<script>
  import Home from "../layouts/Home.svelte";
  import ItemPreviewMarked from "../components/ItemPreviewMarked.svelte";
  
  import SvelteMarkdown from "svelte-markdown";
  import { mdData } from "./data/md";
  const md = mdData.home.body;
</script>

<Home>
  <SvelteMarkdown source={md} renderers={{ image: ItemPreviewMarked }} />
</Home>