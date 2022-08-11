import type { CSSProperties } from 'react'
import styled from 'styled-components'

export interface SvgIconProps {
  name: string
  prefix?: string,
  style?: CSSProperties,
  className?: string
}

const Svg = styled.svg`
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
`

function SvgIcon({ name, prefix = 'icon', ...props }: SvgIconProps) {
  const symbolId = `#${prefix}-${name}`
  return (
    <Svg aria-hidden='true' {...props}>
      <use href={symbolId} />
    </Svg>
  )
}

export default SvgIcon
