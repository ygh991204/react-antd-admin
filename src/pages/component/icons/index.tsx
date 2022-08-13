import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Card, Tabs, Typography, Col, Row, notification, Alert } from 'antd'
import SvgIcon from '@/components/SvgIcon'

const { TabPane } = Tabs
const { Link } = Typography

const modulesFiles = import.meta.globEager('@/assets/icons/*.svg')
const svgNames = Object.keys(modulesFiles)
  .sort()
  .reduce((modules, modulePath) => {
    modules.push(
      modulePath
        .replace(/^\.\/(.*)\.\w+$/, '$1')
        .replace('../../../assets/icons/', '')
        .replace('.svg', '')
    )
    return modules
  }, [] as string[])

function ComponentIcons() {
  return (
    <>
      <Alert
        message={
          <>
            <p>将需要使用的图标（svg）文件放在文件夹 src/icons/ 下；项目会自动根据文件名加载</p>
            <p>使用：{"<SvgIcon name='filename' />"}</p>
          </>
        }
        type='info'
      />

      <Card bordered={false} style={{ marginTop: '20px' }}>
        <Tabs defaultActiveKey='base'>
          <TabPane tab='icons' key='icons'>
            <Row gutter={[20, 20]} style={{ marginTop: '20px' }}>
              {svgNames.map((v) => (
                <Col xxl={2} xl={2} lg={4} md={4} sm={6} xs={6} key={v}>
                  <CopyToClipboard
                    text={'<SvgIcon name="' + v + '" />'}
                    onCopy={(text) => {
                      notification.success({
                        message: text + ' 复制成功'
                      })
                    }}>
                    <div style={{ textAlign: 'center', cursor: 'pointer' }}>
                      <SvgIcon style={{ fontSize: '26', color: '#323233' }} name={v} />
                      <div>{v}</div>
                    </div>
                  </CopyToClipboard>
                </Col>
              ))}
            </Row>
          </TabPane>
          <TabPane tab='ant design icons' key='ant'>
            <Link href='https://ant.design/components/icon-cn/' target='_blank'>
              https://ant.design/components/icon-cn/
            </Link>
          </TabPane>
        </Tabs>
      </Card>
    </>
  )
}

export default ComponentIcons
