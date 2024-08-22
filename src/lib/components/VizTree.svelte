<script>
  import { onMount } from 'svelte';
  import * as d3 from "d3";

  import { projectMetadata } from '$routes/data/metadata';
  
  export let keys;
  export let metadata = projectMetadata;

  const formattedMetadata = formatData(metadata);

  function formatData(data) {
    const fns = [];
    for (let key of keys) {
      fns.push(d => d[key]);
    }
    const rollup = d3.rollups(data, v => v.length, ...fns);
    const root = {name: "root", children: getChildren(rollup)};

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

    const root = d3.hierarchy(formattedMetadata).sum(d => d.value);

    const treemap = d3.tree().size([w - (m.h * 2), h/2 - (m.v * 2)]);

    treemap(root);
    console.log(root.leaves());

    svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .selectAll("path")
        .data(root.links())
        .join("path")
        .attr("d", d3.link(d3.curveBumpX)
            .x(d => d.y)
            .y(d => d.x));

    update();
    
    function update() {
      // const cell = gCell
      //   .selectAll("g")
      //   .data(root.leaves())
      //   .enter().append("g")
      //   .attr("transform",d=>`translate(${d.x0},${d.y0})`)
    
      // cell.append("rect")
      //   .attr("width",d=>d.x1-d.x0)
      //   .attr("height",d=>d.y1-d.y0)
      //   .attr("fill",d=>color(d.parent.data.name))
    
      // cell.append("text")
      //   .text(d=>d.data.name)
      //   .attr("alignment-baseline","hanging")
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