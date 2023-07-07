import * as d3 from "d3";
import { useEffect, useRef } from "react";

function sum(values) {
  return values.reduce((prev, value) => prev + value, 0);
}

export function StackedBarChart({ data }) {
  const axisBottomRef = useRef(null);
  const axisLeftRef = useRef(null);
  const legendRef = useRef(null);

  const categories = data.map((d) => d.for_date);
  const subgroups = data[0].values.map((d) => d.label);
  const max = Math.max(
    ...data.map((d) => sum(d.values.map((v) => v.value)))
  );

  const margin = { top: 10, right: 0, bottom: 20, left: 30 };
  const width = 500 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const scaleX = d3.scaleBand().domain(categories).range([0, width]).padding(0.3);
  const scaleY = d3.scaleLinear().domain([0, max]).range([height, 0]);
  const color = d3
    .scaleOrdinal()
    .domain(subgroups)
    .range(["#e41a1c", "#377eb8", "#4daf4a"]);
  const stacked = d3.stack().keys(subgroups)(
    data.map((d) => ({
      for_date: d.for_date,
      ...d.values.reduce(
        (acc, value) => ({ ...acc, [value.label]: value.value }),
        {}
      ),
    }))
  );

  useEffect(() => {
    if (axisBottomRef.current) {
      d3.select(axisBottomRef.current).call(d3.axisBottom(scaleX));
    }

    if (axisLeftRef.current) {
      d3.select(axisLeftRef.current).call(d3.axisLeft(scaleY));
    }
    // if (legendRef.current) {
    //   const legend = d3.select(legendRef.current);
    //   const legendSize = 20;
    //   const legendSpacing = 30; // Espacement vertical entre les éléments de légende
  
    //   legend
    //     .selectAll("rect")
    //     .data(subgroups)
    //     .enter()
    //     .append("rect")
    //     .attr("x", (d, i) => i * (legendSize + 10))
    //     .attr("y", 0)
    //     .attr("width", legendSize)
    //     .attr("height", legendSize)
    //     .style("fill", color);
  
    //   legend
    //     .selectAll("text")
    //     .data(subgroups)
    //     .enter()
    //     .append("text")
    //     .attr("x", (d, i) => i * (legendSize + 10) + legendSize + 5)
    //     .attr("y", 0) // Début avec un décalage vertical de 0
    //     .text((d) => d)
    //     .attr("transform", (d, i) => `translate(0, ${i * legendSpacing})`); // Décalage vertical en fonction de l'index
  
    //   const legendWidth = legend.node()?.getBBox().width || 0;
    //   legend.attr("transform", `translate(${(width - legendWidth) / 2}, ${margin.top})`);
    // }
    // if (legendRef.current) {
    //   const legend = d3.select(legendRef.current);
    //   const legendSize = 20;
    //   const legendSpacing = 10; // Espacement horizontal entre les éléments de légende
  
    //   legend
    //     .selectAll("rect")
    //     .data(subgroups)
    //     .enter()
    //     .append("rect")
    //     .attr("x", (d, i) => i * (legendSize + legendSpacing))
    //     .attr("y", -legendSize / 2) // Positionnement des rectangles au-dessus de l'axe y
    //     .attr("width", legendSize)
    //     .attr("height", legendSize)
    //     .style("fill", color);
  
    //   legend
    //     .selectAll("text")
    //     .data(subgroups)
    //     .enter()
    //     .append("text")
    //     .attr("x", (d, i) => i * (legendSize + legendSpacing) + legendSize / 2)
    //     .attr("y", -legendSize / 2 - 5) // Positionnement des textes au-dessus de l'axe y avec un décalage vers le haut
    //     .attr("text-anchor", "middle") // Alignement horizontal du texte au centre
    //     .text((d) => d);
  
    //   const legendWidth =
    //     subgroups.length * legendSize + (subgroups.length - 1) * legendSpacing;
    //   legend.attr(
    //     "transform",
    //     `translate(${(width - legendWidth) / 2}, ${margin.top})`
    //   );
    // }
    // if (legendRef.current) {
    //   const legend = d3.select(legendRef.current);
    //   const legendSize = 20;
    //   const legendSpacing = 10; // Espacement horizontal entre les éléments de légende
    //   const legendPaddingTop = 10; // Espacement entre le haut du SVG et les légendes
  
    //   legend
    //     .selectAll("rect")
    //     .data(subgroups)
    //     .enter()
    //     .append("rect")
    //     .attr("x", (d, i) => i * (legendSize + legendSpacing))
    //     .attr("y", -legendSize / 2 + legendPaddingTop) // Positionnement des rectangles avec un décalage vers le bas
    //     .attr("width", legendSize)
    //     .attr("height", legendSize)
    //     .style("fill", color);
  
    //   legend
    //     .selectAll("text")
    //     .data(subgroups)
    //     .enter()
    //     .append("text")
    //     .attr("x", (d, i) => i * (legendSize + legendSpacing) + legendSize / 2)
    //     .attr("y", -legendSize / 2 - 5 + legendPaddingTop) // Positionnement des textes avec un décalage vers le bas
    //     .attr("text-anchor", "middle") // Alignement horizontal du texte au centre
    //     .text((d) => d);
  
    //   const legendWidth =
    //     subgroups.length * legendSize + (subgroups.length - 1) * legendSpacing;
    //   const legendHeight = legend.node()?.getBBox().height || 0;
    //   legend.attr(
    //     "transform",
    //     `translate(${(width - legendWidth) / 2}, ${margin.top + legendHeight + legendPaddingTop})`
    //   );
    // }
    if (legendRef.current) {
      const legend = d3.select(legendRef.current);
      const legendSize = 20;
      const legendSpacing = 30; // Espacement horizontal entre les éléments de légende
      const legendPaddingTop = 10; // Espacement entre le haut du SVG et les légendes
      const legendLineHeight = legendSize + 5; // Hauteur d'une ligne de légende (rectangle + espacement + texte)
  
      legend
        .selectAll("g")
        .data(subgroups)
        .enter()
        .append("g")
        .attr(
          "transform",
          (d, i) =>
            `translate(${i * (legendSize + legendSpacing)}, ${legendPaddingTop})`
        )
        .each(function (d) {
          const group = d3.select(this);
  
          group
            .append("rect")
            .attr("width", legendSize)
            .attr("height", legendSize)
            .style("fill", color(d));
  
          group
            .append("text")
            .attr("x", legendSize / 2)
            .attr("y", -5) // Positionnement du texte au-dessus du rectangle
            .attr("text-anchor", "middle")
            .text(d);
        });
  
      const legendWidth =
        subgroups.length * legendSize + (subgroups.length - 1) * legendSpacing;
      const legendHeight = legendLineHeight; // Hauteur totale du groupe de légendes
      legend.attr(
        "transform",
        `translate(${(width - legendWidth) / 2}, ${margin.top + legendHeight + legendPaddingTop})`
      );
    }
  }, [scaleX, scaleY, color, subgroups, margin.top, width]);

  return (
    <svg
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <g ref={axisBottomRef} transform={`translate(0, ${height})`} />
        <g ref={axisLeftRef} />
        <g
  ref={legendRef}
  
/>
        {stacked.map((data, index) => {
          return (
            <g key={`group-${index}`} fill={color(data.key)}>
              {data.map((d, index) => {
                const label = String(d.data.for_date);
                const y0 = scaleY(d[0]);
                const y1 = scaleY(d[1]);

                return (
                  <rect
                    key={`rect-${index}`}
                    x={scaleX(label)}
                    y={y1}
                    width={scaleX.bandwidth()}
                    height={y0 - y1 || 0}
                  />
                );
              })}
            </g>
          );
        })}
      </g>
    </svg>
  );
}
 export default StackedBarChart

// import * as d3 from "d3";
// import { useEffect, useRef } from "react";

// function sum(values) {
//   return values.reduce((prev, value) => prev + value, 0);
// }

// const StackedBarChart = ({ data }) => {
//   const axisBottomRef = useRef(null);
//   const axisLeftRef = useRef(null);

//   const header = "label,value1,value2,value3";
//   const body = data
//     .map(({ label, values }) => [label, ...values].join(","))
//     .join("\n");
//   const csv = d3.csvParse([header, body].join("\n"));

//   const margin = { top: 10, right: 0, bottom: 20, left: 30 };
//   const width = 500 - margin.left - margin.right;
//   const height = 300 - margin.top - margin.bottom;

//   const subgroups = header.split(",");
//   const labels = csv.map((data) => data.label || "");
//   const max = Math.max(
//     ...csv.map((data) =>
//       sum([data.value1, data.value2, data.value3].map(Number))
//     )
//   );

//   const scaleX = d3.scaleBand().domain(data.map(({ category }) => category)).range([0, width]).padding(0.3);
//   const scaleY = d3.scaleLinear().domain([0, max]).range([height, 0]);
//   const color = d3
//     .scaleOrdinal()
//     .domain(subgroups)
//     .range(["#e41a1c", "#377eb8", "#4daf4a"]);
//   const stacked = d3.stack().keys(subgroups)(csv);

//   useEffect(() => {
//     if (axisBottomRef.current) {
//       d3.select(axisBottomRef.current).call(d3.axisBottom(scaleX));
//     }

//     if (axisLeftRef.current) {
//       d3.select(axisLeftRef.current).call(d3.axisLeft(scaleY));
//     }
//   }, [scaleX, scaleY]);

//   return (
//     <svg
//       width={width + margin.left + margin.right}
//       height={height + margin.top + margin.bottom}
//     >
//       <g transform={`translate(${margin.left}, ${margin.top})`}>
//         <g ref={axisBottomRef} transform={`translate(0, ${height})`} />
//         <g ref={axisLeftRef} />
//         {stacked.map((data, index) => {
//           return (
//             <g key={`group-${index}`} fill={color(data.key)}>
//               {data.map((d, index) => {
//                 const label = String(d.data.label);
//                 const y0 = scaleY(d[0]);
//                 const y1 = scaleY(d[1]);

//                 return (
//                   <rect
//                     key={`rect-${index}`}
//                     x={scaleX(label)}
//                     y={y1}
//                     width={scaleX.bandwidth()}
//                     height={y0 - y1 || 0}
//                   />
//                 );
//               })}
//             </g>
//           );
//         })}
//       </g>
//     </svg>
//   );
// }

// export default StackedBarChart


// import { scaleBand, scaleLinear, scaleOrdinal } from "d3";
// import React from "react";
// import AxisBottom from "./custom/AxisBottom";
// import AxisLeft from "./barcomponents/AxisLeft";

// const StackedBarChart = ({ data = [] }) => {
//   const margin = { top: 10, right: 0, bottom: 20, left: 30 };
//   const width = 500 - margin.left - margin.right;
//   const height = 300 - margin.top - margin.bottom;

//   const categories = data.map(({ category }) => category);
//   const subCategories = data[0].values.map(({ label }) => label);

//   const xScale = scaleBand()
//     .domain(data.map(({ category }) => category))
//     .range([0, width])
//     .padding(0.5);

//   const yScale = scaleLinear()
    // .domain([
    //   0,
    //   Math.max(
    //     ...data.flatMap(({ values }) => values.map(({ value }) => value))
    //   ),
    // ])
//     .range([height, 0]);

//   const colorScale = scaleOrdinal()
//     .domain(subCategories)
//     .range(["#ff0000", "#00ff00", "#0000ff"]);

//   return (
//     <svg
//       width={width + margin.left + margin.right}
//       height={height + margin.top + margin.bottom}
//     >
//       <g transform={`translate(${margin.left}, ${margin.top})`}>
//         <AxisBottom
//           scales={{ x: xScale }}
//           transform={`translate(0, ${height})`}
//         />
//         <AxisLeft scale={yScale} />

//         {data.map(({ category, values }) => (
//           <g key={category}>
//             {values.map(({ label, value }) => (
//               <rect
//                 key={`${category}-${label}`}
//                 x={xScale(category)}
//                 y={yScale(value)}
//                 width={xScale.bandwidth()}
//                 height={yScale(0) - yScale(value)}
//                 fill={colorScale(label)}
//               />
//             ))}
//           </g>
//         ))}

//       </g>
//     </svg>
//   );
// };

// export default StackedBarChart;
