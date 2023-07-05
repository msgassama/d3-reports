import React, { useEffect, useRef } from 'react'
import { select, axisBottom } from 'd3'

const AxisBottom = ({scale, transform}) => {
    const ref = useRef(null)

    useEffect(() => {
        if (ref.current) {
            select(ref.current).call(axisBottom(scale));
        }
    }, [scale])

  return (
    <g ref={ref} transform={transform} />
  )
}

export default AxisBottom