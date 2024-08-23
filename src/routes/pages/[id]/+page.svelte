<script>
  import Page from "$layouts/Page.svelte";
  import IIIFViewer from "$components/IIIFViewer.svelte";
  import MetadataCard from "$components/MetadataCard.svelte";
  import serieConfig from "../../../config/serie.config";

  export let data;

  const itemMetadata = data.itemMetadata;
  const pagesConfig = serieConfig.pages;
</script>

<svelte:head>
  <title>{`${itemMetadata.label} - ${serieConfig.title}`}</title>
</svelte:head>

<Page name={itemMetadata.label}>
  <h1>{itemMetadata.label}</h1>

  {#if pagesConfig.iiifViewer}
    <IIIFViewer pid={itemMetadata.pid} />
  {/if}

  <MetadataCard {itemMetadata} />
</Page>