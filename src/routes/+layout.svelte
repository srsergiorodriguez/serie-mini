<svelte:head>
  <style>
      @import url("https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@300;500;700&display=swap");
  </style>
</svelte:head>

<slot></slot>

<style>
  :global(:root){
    --stroke: black;
    --fill: #fdfcfa;
    --accent1: #c9e2ef;
    --accent2: #0b456c;
    --mainfont: 'Helvetica', sans-serif;
    font-family: var(--mainfont);
  }

  :global(body) {
    padding: 0px;
    margin: 0px;
    background: var(--fill);
    color: var(--stroke);
  }

  :global(button, select, input) {
    font-family: var(--mainfont);
  }

  :global(h1, h2, h3, h4, h5, h6) {
    font-family: var(--mainfont);
    color: var(--accent2);
  }

  :global(h1) {
    font-size: 2em;
  }

  :global(p, li) {
    font-size: 1.1em;
  }

  :global(table) {
    border-collapse: collapse;
    max-width: 100%;
  }

  :global(th, td) {
    border: 1px solid rgba(0,0,0,0.2);
    padding: 0.5em;
  }

  :global(.no-select)  {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  :global(.noevents) {
    pointer-events: none;
  }

  @media screen and (max-device-width: 450px) {
    :global(p,.block-text) {
      font-size: 0.9em;
    }
  }
</style>