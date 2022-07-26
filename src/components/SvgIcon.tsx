import React from 'react'
import styled from 'styled-components'

const Svg = styled.svg`
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
`

const SvgIcon: React.FC<{
  name: string
  prefix?: string,
  [key:string]: any
}> = ({ name, prefix = 'icon', ...props }) => {
  const symbolId = `#${prefix}-${name}`
  return (
    <Svg aria-hidden='true' {...props}>
      <use href={symbolId} />
    </Svg>
  )
}

export default SvgIcon
