import { CSSProperties, DOMAttributes, useEffect, useState } from 'react'
import { Select } from 'antd'
import styled from 'styled-components'

const { Option } = Select

const modulesFiles = import.meta.globEager('@/assets/icons/*.svg')

export const svgNames = Object.keys(modulesFiles).reduce((modules, modulePath) => {
  modules.push(
    modulePath
      .replace(/^\.\/(.*)\.\w+$/, '$1')
      .replace('../assets/icons/', '')
      .replace('.svg', '')
  )
  return modules
}, [] as string[])

export type SvgIconProps = {
  name: string
  prefix?: string
  style?: CSSProperties
  className?: string
} & DOMAttributes<SVGSVGElement>

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

export type SvgIconSelectProps = {
  value?: string
  onChange?: (newValue: string) => void
}

function SvgIconSelect({ onChange, value = '' }: SvgIconSelectProps) {
  const [valueState, setValueState] = useState(value)

  useEffect(() => {
    if (value !== valueState) {
      setValueState(value)
    }
  }, [value])

  function handleChange(val: string) {
    setValueState(val)
    onChange && onChange(val)
  }

  return (
    <Select
      style={{ width: '200px' }}
      showSearch
      allowClear
      value={valueState || undefined}
      placeholder='请选择图标'
      onChange={handleChange}
      filterOption={(input, option) => {
        return (option?.value as string).toLowerCase().indexOf(input.toLowerCase()) !== -1
      }}>
      {svgNames.map((svg) => (
        <Option key={svg} value={svg}>
          <SvgIcon style={{ fontSize: '16px', color: '#666666', marginRight: '8px' }} name={svg} />
          {svg}
        </Option>
      ))}
    </Select>
  )
}

SvgIcon.Select = SvgIconSelect

export default SvgIcon
