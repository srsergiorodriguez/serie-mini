<script>
  import Default from "./Default.svelte";
  import Header from "$components/Header.svelte";
  import ContentSlot from "$components/ContentSlot.svelte";
  import Footer from "$components/Footer.svelte";

  // export const name;
</script>

<!-- <svelte:head>
  <title>{name}</title>
</svelte:head> -->

<Default>
  <Header />
  <ContentSlot>
    <slot></slot>
  </ContentSlot>
  <Footer />
</Default>