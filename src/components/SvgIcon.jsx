import styled from 'styled-components'

const Svg = styled.svg`
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
`

const SvgIcon = ({ name, prefix = 'icon', ...props }) => {
  const symbolId = `#${prefix}-${name}`
  return (
    <Svg {...props} aria-hidden='true'>
      <use href={symbolId} />
    </Svg>
  )
}

export default SvgIcon
