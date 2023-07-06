import React, { useEffect, useRef } from 'react';
import { select, axisBottom } from 'd3';

const AxisBottom = ({ scales, transform }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisBottom(scales.x));
    }
  }, [scales.x]);

  return <g ref={ref} transform={transform} />;
};

export default AxisBottom;
