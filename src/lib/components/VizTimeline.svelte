<script>
  import serieConfig from '$config/serie.config';
  import { base } from '$app/paths';

  import { onMount } from 'svelte';
  import * as d3 from "d3";

  import { projectMetadata } from '$routes/data/metadata';
  
  export let dateKey;
  export let metadata = projectMetadata;

  let pieces = [];

  const formattedObject = {};
  for (let d of metadata) {
    if (formattedObject[d[dateKey]] === undefined) {
      formattedObject[d[dateKey]] = {date: new Date(d[dateKey]), data: []}
    }
    // Para testear
    // for (let i = 0; i < 100; i++) {
    //   formattedObject[d[dateKey]].data.push({pid: d.pid, label: d.label});
    // }
    formattedObject[d[dateKey]].data.push({pid: d.pid, label: d.label});
  }
  const formattedData = Object.values(formattedObject);

  let svgElement;
  let resetZoom;

  onMount(makeTimeline);

  function rerender() {
    d3.select(svgElement).selectAll("g").remove();
    makeTimeline();
  }

  function makeTimeline() {
    const svg = d3.select(svgElement);
    const svgStyle = getComputedStyle(svgElement);
    const w = +svgStyle.width.replace("px","");
    const h = +svgStyle.height.replace("px","");
    const m = {h: w * 0.05, v: h * 0.2};

    const zoom = d3.zoom()
      .scaleExtent([1, 32])
      .on("zoom", zoomed);

    const g = d3.select(svgElement).append("g").attr("transform", `translate(${m.h}, ${m.v})`);
    const gx = svg.append("g");
    
    const xAxis = (g, x) => g
      .attr("transform", `translate(${m.h},${h * 0.7})`)
      .call(
        d3.axisBottom(x)
        .tickFormat((d, index, ticks) => {
          const formatToYear = d3.timeFormat("%Y");
          const formatToMonth = d3.timeFormat("%m");
          const dates = ticks.map(d => d.__data__);
          if (index === 0) {
            return "..." + formatToYear(d);
          }
          if (dates[index - 1].getFullYear() === d.getFullYear()) {
            return formatToMonth(d);
          }
          return formatToYear(d)
        })
      )

    const gDot = g.append("g")
      .attr("fill", "none")
      .attr("stroke-linecap", "round")
      .style("stroke-width", 2)

    // const y = d3.scaleLinear().domain([-1, 1]).range([h - (m.v * 2), 0]);
    const x = d3.scaleTime()
      .domain(d3.extent(formattedData, d => d.date))
      .range([0, w - (m.h * 2)])
      .nice()

    svg.call(zoom).call(zoom.transform, d3.zoomIdentity);
    update(x);
    
    function zoomed({transform}) {
      const zx = transform.rescaleX(x).interpolate(d3.interpolateRound);
      gx.call(xAxis, zx);
      update(zx);
    }

    resetZoom = () => {  
      const transform = d3.zoomIdentity.translate(0, 0).scale(1); 
      pieces = [];
      
      svg.transition()
          .ease(d3.easeQuadOut)
          .duration(500)
          .call(zoom.transform, transform);
      
      return d3.zoomTransform(svg.node())
    }

    function update(scale) {
      const dots = gDot.selectAll("circle")
      .data(formattedData)
      .join("circle")
        .attr("cx", d => scale(d.date))
        .attr("cy", m.v)
        .attr("r", 10)
        .attr("stroke", "var(--accent2)")
        .attr("fill", "var(--accent1)")
        .attr("cursor", "pointer")

      dots.on("click", function(event, d) {
        pieces = d.data;  
      })
    }
  }

</script>

<svelte:window on:resize={() => {rerender()}} />

<div class="timeline-container">
  <svg bind:this={svgElement} width="100%"></svg>
  <div class="works-preview-container">
    <div class="network-container-overlay">
      <button class="reset-button" on:click={resetZoom}><img src='./icons/reset.png' alt='reset'></button>
    </div>
    {#if serieConfig.pages.iiifViewer && pieces.length > 0}
      {#each pieces as d, i (i)}
        <div class="work-preview no-select">
          <a class="thumb" href="{base}/pages/{d.pid}"><img class="noevents" src="{base}/iiif/{d.pid}/0/full/256,/0/default.jpg" alt={d.label}/></a>
          <a href="{base}/pages/{d.pid}"><span>{d.label}</span></a>
        </div>
      {/each}
    {/if}
  </div>
</div>

<style>
  .timeline-container {
    margin: 1em;
    /* border: solid 1px var(--stroke); */
  }

  .thumb {
    height: 100px;
    max-width: 200px;
    object-fit: contain;
  }

  .thumb img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .works-preview-container {
    padding: 1em;
    display: flex;
    gap: 1em;
    overflow-x: scroll;
  }

  .work-preview {
    display: flex;
    flex-direction: column;
  }

  svg {
    height: 100px;
    cursor: grab;
  }

  svg:active {
    cursor: grabbing;
  }
</style>