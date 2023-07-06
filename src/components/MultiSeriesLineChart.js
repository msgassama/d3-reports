import { curveLinear, curveLinearClosed, curveMonotoneX, line, scaleBand, scaleLinear, scaleOrdinal } from 'd3';
import React from 'react'
import AxisLeft from './barcomponents/AxisLeft';
import AxisBottom from './custom/AxisBottom';

const MultiSeriesLineChart = ({data=[]}) => {
    const margin = { top: 10, right: 0, bottom: 20, left: 30 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const xScale = scaleBand()
    .domain(data[0].data.map(({ label }) => label))
    .range([0, width])
    // .padding(0.5);

    const yScale = scaleLinear()
    .domain([0, Math.max(...data.flatMap(({ data }) => data.map(({ value }) => value)))])
    .range([height, 0]);

  const colorScale = scaleOrdinal()
    .domain(data.map(({ category }) => category))
    .range(['#ff0000', '#00ff00', '#0000ff']); //

    const lineGenerator = line()
    .x(({ label }) => xScale(label))
    .y(({ value }) => yScale(value))
    .curve(curveLinear);

    // const scaleY = scaleLinear()
    // .domain([0, Math.max(...data.map(({ value }) => value))])
    // .range([height, 0]);

    
  return (
    <svg
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
    >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom scales={{ x: xScale }} transform={`translate(0, ${height})`} />
        <AxisLeft scale={yScale} />
        {data.map(({ category, data }) => (
        //   <path
        //     key={category}
        //     d={lineGenerator(data)}
        //     fill="none"
        //     stroke={colorScale(category)}
        //     strokeWidth={2}
        //   />
        <g key={category}>
          <path
            d={lineGenerator(data)}
            fill="none"
            stroke={colorScale(category)}
            strokeWidth={2}
          />
          {data.map(({ label, value }) => (
            <circle
            key={`${category}-${label}`}
            className={`data-point ${category}`}
            cx={xScale(label)}
            cy={yScale(value)}
            r={4} // rayon du cercle
            fill={colorScale(category)} // coul
            />
          ))}
        </g>
        ))}
        </g>
    </svg>
  )
}

export default MultiSeriesLineChart