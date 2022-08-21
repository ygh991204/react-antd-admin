import pkg from '../../../package.json'
import { Card, Descriptions, Tag, Button } from 'antd'

type DevDependenciesKey = keyof typeof pkg.devDependencies
type DependenciesKey = keyof typeof pkg.dependencies

export default function About() {
  return (
    <>
      <Card bordered={false}>
        <h2>{ pkg.name }</h2>
        <p>{ pkg.description }</p>
        <Descriptions title='' bordered column={2}>
          <Descriptions.Item label='版本'>
            { pkg.version }
          </Descriptions.Item>
          <Descriptions.Item label='开源协议'>
            { pkg.license }
          </Descriptions.Item>
          <Descriptions.Item label='标签'>
            {
              pkg.keywords.map(v => (
                <Tag key={v}>{v}</Tag>
              ))
            }
          </Descriptions.Item>
          <Descriptions.Item label='文档地址'>
            <Button type='link' href={ pkg.homepage } target='_blank'>文档地址</Button>
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card style={{ marginTop: '20px' }} bordered={false} title='生产依赖'>
        <Descriptions title='' bordered>
          {Object.keys(pkg.dependencies).map((key) => (
            <Descriptions.Item key={key} label={key}>
              {pkg.dependencies[key as DependenciesKey]}
            </Descriptions.Item>
          ))}
        </Descriptions>
      </Card>
      <Card style={{ marginTop: '20px' }} bordered={false} title='开发依赖'>
        <Descriptions title='' bordered>
          {Object.keys(pkg.devDependencies).map((key) => (
            <Descriptions.Item key={key} label={key}>
              {pkg.devDependencies[key as DevDependenciesKey]}
            </Descriptions.Item>
          ))}
        </Descriptions>
      </Card>
    </>
  )
}
