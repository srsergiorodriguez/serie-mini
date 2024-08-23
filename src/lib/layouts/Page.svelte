<script>
  import Default from "./Default.svelte";
  import Header from "$components/Header.svelte";
  import ContentSlot from "$components/ContentSlot.svelte";
  import Footer from "$components/Footer.svelte";
</script>

<Default>
  <Header />
  <ContentSlot>
    <slot></slot>
  </ContentSlot>
  <Footer />
</Default>