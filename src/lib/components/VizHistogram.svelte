<script>
  import { onMount } from 'svelte';
  import * as d3 from "d3";

  import { projectMetadata } from '$routes/data/metadata';
  
  export let key;
  export let metadata = projectMetadata;

  const formattedMetadata = metadata.map(d => {
    const newd = {...d};
    newd[key] = +newd[key]
    return newd
  });

  let svgElement;

  onMount(makeViz);

  function rerender() {
    d3.select(svgElement).selectAll("g").remove();
    makeViz();
  }

  function makeViz() {
    const svg = d3.select(svgElement);
    const svgStyle = getComputedStyle(svgElement);
    const w = +svgStyle.width.replace("px","");
    const h = +svgStyle.height.replace("px","");
    const m = {h: w * 0.2, v: h * 0.1};

    const extent = d3.extent(formattedMetadata, d => d[key]);
    const binGenerator = d3.histogram().domain(extent).value(d=>d[key]).thresholds(d3.thresholdFreedmanDiaconis);
    const bins = binGenerator(formattedMetadata);

    const g = svg.append("g").attr("transform", `translate(${m.h}, ${m.v})`);
    const gBar = g.append("g");

    const x = d3.scaleLinear().domain(extent).range([0, w - (m.h * 2)])//.nice();
    const y = d3.scaleLinear().domain([0, d3.max(bins, d => d.length)]).range([h - (m.v * 2), 0]);

    const xAxis = d3.axisBottom(x);
    svg.append("g").attr("transform", `translate(${m.h},${h - m.v})`).call(xAxis);
    
    const yAxis = d3.axisLeft(y);
    svg.append("g").attr("transform", `translate(${m.h},${m.v})`).call(yAxis);

    update();
    
    function update() {
      gBar.selectAll("rect")
        .data(bins)
        .join("rect")
          .attr("transform", d => `translate(${x(d.x0)} , ${y(d.length)})`)
          .attr("width", d => x(d.x1) - x(d.x0) - 1)
          .attr("height", d => (h - (m.v*2)) - y(d.length))
          .attr("fill", "var(--accent2)")
    }
  }

</script>

<svelte:window on:resize={() => {rerender()}} />

<div class="viz-container" style="--height:{300}">
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