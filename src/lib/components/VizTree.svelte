<script>
  import { onMount } from 'svelte';
  import * as d3 from "d3";
  import { projectMetadata } from '$routes/data/metadata';
  import ItemsBar from '$components/ItemsBar.svelte';
  
  export let keys;
  export let metadata = projectMetadata;

  let items = [];
  let dots;

  const formattedMetadata = formatData(metadata);
  const root = d3.hierarchy(formattedMetadata).sum(d => d.value);
  const height = root.leaves().length * 35;

  function reset() {
    items = [];
    dots.attr("stroke-width", 1);
  }

  function formatData(data) {
    const fns = [];
    for (let key of keys) {
      fns.push(d => d[key]);
    }
    const rollup = d3.rollups(data, v => v.length, ...fns);
    const root = {name: "", children: getChildren(rollup)};

    function getChildren(parentList) {
      const objs = [];
      for (let parent of parentList) {
        const obj = { name: parent[0] };
        if ( typeof parent[1] === "number") {
          obj.value = parent[1]
        } else if ( Array.isArray(parent[1])) {
          obj.children = getChildren(parent[1]);
        }
        objs.push(obj);
      }
      return objs
    }

    return root
  }

  let svgElement;

  onMount(makeViz);

  function getItems(data) {
    let currentNode = data;
    const filters = [];
    for (let i = 0; i < data.depth; i++) {
      const filter = {
        key: keys[currentNode.depth - 1],
        value: currentNode.data.name,
        depth: currentNode.depth
      }
      filters.push(filter);
      currentNode = currentNode.parent;
    }

    const filterFn = (d) => {
      let valid = true;
      for (let f of filters) {
        if (d[f.key] !== f.value) {
          valid = false;
          break
        }
      }
      return valid
    }
    const filtered = metadata.filter(d => filterFn(d));
    return filtered
  }

  function rerender() {
    d3.select(svgElement).selectAll("g").remove();
    makeViz();
  }

  function makeViz() {
    const svg = d3.select(svgElement);
    const svgStyle = getComputedStyle(svgElement);
    const w = +svgStyle.width.replace("px","");
    const h = +svgStyle.height.replace("px","");
    const m = {h: w * 0.1, v: 10};
    const r = 7;

    const g = svg.append("g").attr("transform", `translate(${m.h}, ${m.v})`);

    const tree = d3.tree().size([h - (m.v * 2), w - (m.h * 4)]);
    tree(root);

    update();
    
    function update() {
      g.append("g")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .selectAll("path")
        .data(root.links())
        .join("path")
        .attr("d", d3.link(d3.curveBumpX)
            .x(d => d.y)
            .y(d => d.x));

      const nodes = g.append("g")
        .selectAll("g")
        .data(root.descendants())
        .join("g")
          .attr("transform", d => `translate(${d.y},${d.x})`);

      dots = nodes.append("circle")
        .attr("stroke", "var(--accent2)")
        .attr("fill", "var(--accent1)")
        .attr("cursor", "pointer")
        .attr("r", r)
        .attr("stroke-width", 1)

      dots.on("click", function(event, d) {
        items = getItems(d);
        const elt = d3.select(event.target);
        dots.attr("stroke-width", 1);
        elt.attr("stroke-width", 4);
      })

      nodes.append("text")
        .text(d => d.data.name)
        .attr("font-size", 7 + (w/150))
        .attr("text-anchor", d => d.children ? "end" : "start")
        .attr("paint-order", "stroke")
        .attr("stroke", "var(--fill)")
        .attr("stroke-width", 6)
        .attr("x", d => d.children ? -r - 4 : r + 4)
        .attr("dy", "0.32em")
    }
  }

</script>

<svelte:window on:resize={() => {rerender()}} />

<div class="viz-container" style="--height:{height}">
  <svg bind:this={svgElement} width="100%"></svg>
  {#if items.length > 0}
    <div class="network-container-overlay">
      <button class="reset-button" on:click={reset}><img src='./icons/reset.png' alt='reset'></button>
    </div>
  {/if}
  <ItemsBar {items} />
</div>

<style>
  .viz-container {
    margin: 1em;
    position: relative;
  }

  .network-container-overlay {
    position: absolute;
    top: 10px;
    left: 2%;
  }

  svg {
    height: calc( var(--height) * 1px );
  }
</style>