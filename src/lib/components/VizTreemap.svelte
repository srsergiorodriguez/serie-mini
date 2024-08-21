<script>
  import { onMount } from 'svelte';
  import * as d3 from "d3";

  import { projectMetadata } from '$routes/data/metadata';
  
  export let keys;
  export let metadata = projectMetadata;

  const formattedMetadata = formatData(metadata);

  console.log(formattedMetadata);

  function formatData(data) {
    
    const root = {};
    const currentParent = data;
    for (let i = 0; i < d3.min([2, keys.length]); i++) {
      for (let d of data) {
        if (current)
        const obj = {
          name: d[keys[i]],
          children: 
        }
      }
      
    }

    function getChildren() {
      
    }
  }

  let svgElement;

  // onMount(makeViz);

  function rerender() {
    d3.select(svgElement).selectAll("g").remove();
    // makeViz();
  }

  function makeViz() {
    const svg = d3.select(svgElement);
    const svgStyle = getComputedStyle(svgElement);
    const w = +svgStyle.width.replace("px","");
    const h = +svgStyle.height.replace("px","");
    const m = {h: w * 0.2, v: h * 0.1};

    const g = svg.append("g").attr("transform", `translate(${m.h}, ${m.v})`);
    const gCell = g.append("g");

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const root = d3.hierarchy();

    root.sum(d => d.value);
    const treemap = d3.treemap().size([w - (m.h * 2), h - (m.v * 2)])//.paddingInner(4);
    
    // Transform the JSON object into a hierarchy
    treemap(root);

    update();
    
    function update() {
      const cell = gCell.select("#tree")
        .selectAll("g")
        .data(root.leaves())
        .enter().append("g")
        .attr("transform",d=>`translate(${d.x0},${d.y0})`)
    
      cell.append("rect")
        .attr("width",d=>d.x1-d.x0)
        .attr("height",d=>d.y1-d.y0)
        .attr("fill",d=>color(d.parent.data.name))
    
      cell.append("text")
        .text(d=>d.data.name)
        .attr("alignment-baseline","hanging")
    }
  }

</script>

<svelte:window on:resize={() => {rerender()}} />

<div class="viz-container" style="--height:{500}">
  <svg bind:this={svgElement} width="100%"></svg>
</div>

<style>
  .viz-container {
    margin: 1em;
    height: calc( var(--height) * 1px );
  }

  svg {
    height: 100%;
  }
</style>