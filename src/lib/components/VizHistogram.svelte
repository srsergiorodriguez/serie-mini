<script>
  import { onMount } from 'svelte';
  import * as d3 from "d3";

  import { projectMetadata } from '$routes/data/metadata';
  
  export let key;
  export let metadata = projectMetadata;

  const binGenerator = d3.bin();
  const bins = binGenerator(metadata, d => d[key]);

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

    const g = d3.select(svgElement).append("g").attr("transform", `translate(${m.h}, ${m.v})`);
    const gBar = g.append("g");

    const x = d3.scaleLinear().domain([bins[0].x0, bins[bins.length - 1].x1]).range([0, w - (m.h * 2)]);
    const y = d3.scaleLinear().domain([0, d3.max(bins, (d) => d.length)]).range([0, h - (m.v * 2)]);

    const xAxis = d3.axisBottom(x);
    svg.append("g").attr("transform", `translate(${m.h},${h - m.v})`).call(xAxis);
    
    const yAxis = d3.axisLeft(y);
    svg.append("g").attr("transform", `translate(${m.h},${m.v})`).call(yAxis);

    update();
    
    function update() {
      gBar.selectAll("rect")
        .data(bins)
        .join("rect")
          // .attr("x", 0)
          // .attr("y", d => y(d.key))
          // .attr("width", d => x(d.count))
          // .attr("height", y.bandwidth())
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
    /* border: solid 1px black; */
  }

  svg {
    height: 100%;
  }
</style>