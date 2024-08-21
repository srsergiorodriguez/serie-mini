<script>
  import { onMount } from 'svelte';
  import * as d3 from "d3";

  import { projectMetadata } from '$routes/data/metadata';

  export let link = "autor";

  let svgElement;

  onMount(makeNetwork);

  function makeNetwork() {
    const svgStyle = getComputedStyle(svgElement);
    const w = +svgStyle.width.replace("px","");
    const h = +svgStyle.height.replace("px","");
    const g = d3.select(svgElement).select("g");

    const gDot = g.append("g")
      .attr("fill", "none")
      .attr("stroke-linecap", "round")
      .style("stroke-width", 20)

    const nodes = JSON.parse(JSON.stringify(projectMetadata));

    const values = {};

    const links = [];
    for (let n of nodes) {
      if (values[n[link]] === undefined) {
        values[n[link]] = [];
      }
      values[n[link]].push()
    }

    const ticks = 1000;
    for (let i = 0; i < ticks; i++) {
      simulate(nodes);
    }

    const x = d3.scaleLinear().domain(d3.extent(nodes, d => d.x)).range([0, w]);
    const y = d3.scaleLinear().domain(d3.extent(nodes, d => d.y)).range([h, 0]);

    render();

    function render() {
      gDot.selectAll("path")
      .data(nodes)
      .join("path")
        .attr("d", d => `M${x(d.x)},${y(d.y)}h0`)
        .attr("stroke", d => "red"); 

      // links.selectAll("line")
      //   .data(data.links)
      //   .join('line')
      //   .attr("stroke", "black")
      //   .attr("x1", d => d.source.x)
      //   .attr("y1", d => d.source.y)
      //   .attr("x2", d => d.target.x)
      //   .attr("y2", d => d.target.y)
    }
    
    function simulate(nodes, links) {
      const simulation = d3.forceSimulation(nodes)
        // .force("link", d3.forceLink(links).strength(0.5).distance(40))
        // .force("charge", d3.forceManyBody().strength(100).theta(1))
        .force("center", d3.forceCenter(w / 2, h / 2))
        // .force("collide", d3.forceCollide().radius(d => d.r * 2))
        .stop()
      
      simulation.tick();
    }
  }

</script>

<div class="network-container">
  <svg bind:this={svgElement} width="100%">
    <g></g>
  </svg>
</div>

<style>
  svg {
    border: solid 1px;
    min-height: 400px;
  }
</style>