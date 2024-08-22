<script>
  import { onMount } from 'svelte';
  import * as d3 from "d3";

  import { projectMetadata } from '$routes/data/metadata';
  
  export let key;
  export let metadata = projectMetadata;
  export let top = 10;

  const formattedObject = {};
  for (let d of metadata) {
    if (formattedObject[d[key]] === undefined) {
      formattedObject[d[key]] = {key: d[key], count: 0}
    }
    formattedObject[d[key]].count++;
  }
  let formattedData = Object.values(formattedObject).sort((a, b) => d3.descending(a.count, b.count))
  if (top !== undefined) {
    formattedData = formattedData.slice(0, top);
  }

  const rows = formattedData.length * 70;

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

    const g = svg.append("g").attr("transform", `translate(${m.h}, ${m.v})`);
    const gBar = g.append("g");

    const y = d3.scaleBand().domain(formattedData.map(d => d.key)).range([0, h - (m.v * 2)]).padding(0.33);
    const x = d3.scaleLinear().domain([0, d3.max(formattedData, d => d.count)]).range([0, w - (m.h * 2)]).nice();

    const xAxis = d3.axisBottom(x);
    const gx = svg.append("g").attr("transform", `translate(${m.h},${h - m.v})`).call(xAxis);
    
    const yAxis = d3.axisLeft(y);
    const gy = svg.append("g").attr("transform", `translate(${m.h},${m.v})`).call(yAxis);

    update();
    
    function update() {
      gBar.selectAll("rect")
        .data(formattedData)
        .join("rect")
          .attr("x", 0)
          .attr("y", d => y(d.key))
          .attr("width", d => x(d.count))
          .attr("height", y.bandwidth())
          .attr("fill", "var(--accent2)")
    }
  }

</script>

<svelte:window on:resize={() => {rerender()}} />

<div class="viz-container" style="--height:{rows}">
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