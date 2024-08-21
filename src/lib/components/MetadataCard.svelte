<script>
  import serieConfig from '$config/serie.config';
  import { base } from '$app/paths';
  import { projectMetadata } from '$routes/data/metadata';

  const pagesConfig = serieConfig.pages;

  export let itemMetadata;
</script>

<div class="metadata-card">
  <ul>
    {#each pagesConfig.metadataToShow as {key, label, type} (key)}
      {#if type === "text"}
        <li class="metadata-item"><span class="metadata-key">{label}:</span><span>{itemMetadata[key]}</span></li>
      {:else if type === "link"}
        <li class="metadata-item"><a class="metadata-key" href={itemMetadata[key]} target="_blank">{label}</a></li>
      {:else if type === "ref"}
        <li class="metadata-item">
          <span class="metadata-key">{label}:</span>
          {#each itemMetadata[key].split("/") as ref}
            {@const item = projectMetadata.find(d => d.pid === ref.trim())}
            {#if item !== undefined}
              <a href="{base}/pages/{item.pid}" data-sveltekit-reload>{item.label}</a>
            {/if}
          {/each}
        </li>
      {:else if type === "image"}
        <li class="metadata-item block-item">
          <span class="metadata-key">{label}:</span>
          <div class="image-container">
            <img src={/(^http)/.test(itemMetadata[key]) ? itemMetadata[key] : `${base}/${itemMetadata[key]}`} alt={label} />
          </div>
        </li>
      {:else if type === "video"}
        <li class="metadata-item block-item">
          <span class="metadata-key">{label}:</span>
          <div class="video-container">
            <!-- svelte-ignore a11y-media-has-caption -->
            <video src={/(^http)/.test(itemMetadata[key]) ? itemMetadata[key] : `${base}/${itemMetadata[key]}`} class="video" controls controlsList="nodownload noremoteplayback">Your browser does not support the video element / Tu buscador no soporta reprodución de video</video>
          </div>
        </li>
      {:else if type === "audio"}
        <li class="metadata-item block-item">
          <span class="metadata-key">{label}:</span>
          <audio controls><source src={/(^http)/.test(itemMetadata[key]) ? itemMetadata[key] : `${base}/${itemMetadata[key]}`}>Your browser does not support the audio element / Tu buscador no soporta reproducción de audio</audio>
        </li>
      {:else if type === "youtube"}
        <li class="metadata-item block-item">
          <span class="metadata-key">{label}:</span>
          <iframe src={`https://www.youtube.com/embed/${itemMetadata[key]}`} title="YouTube video player" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </li>
      {/if}
    {/each}
  </ul>
</div>

<style>
  .metadata-card {
    padding: 0;
    border: 1px solid rgba(0,0,0,0.2);
    max-width: 100%;
    margin: auto;
    margin-top: 1em;
    padding: 0px 1em;
  }

  .metadata-card ul{
    display: flex;
    flex-direction: column;
    gap: 0.3em;
    padding: 0;
  }

  .metadata-item {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    justify-content: left;
    list-style-type: none;
  }

  .metadata-item.block-item {
    gap: 0.3em;
    flex-direction: column;
  }

  .metadata-key, a {
    color: var(--accent2);
    font-weight: bold;
  }

  .video {
    max-width: 80%;
  }

  .image-container {
    max-width: 80%;
    max-height: 900px;
  }

  .image-container img {
    max-width: 100%;
    max-height: 100%;
  }

  .metadata-item iframe {
    max-width: 80%;
    min-height: 500px;
  }

</style>