import { Card, Space, Typography, Alert } from 'antd'
import RichText from '@/components/RichText'

const { Link } = Typography

function ComponentRichText() {
  return (
    <>
      <Alert
        message={
          <>
            <p>富文本是后台管理的一个核心功能</p>
            <p>市面上常见的富文本，我都有了解过，权衡之中选择了 Quill.js</p>
            <p>
              Quill.js：够轻量、性能好，具有强大的api和定制能力。对于基本的商品详情和文章详情这些编辑需求，它已经够用了；当然，你也可以自己定制它
            </p>
          </>
        }
        type='info'
      />
      <Card
        style={{ marginTop: '20px' }}
        title={
          <Space>
            <Link href='https://quilljs.com/' target='_blank'>
              https://quilljs.com/
            </Link>
          </Space>
        }
        bordered={false}>
        <Alert
          style={{ marginBottom: '20px' }}
          message={
            <>
              <p>富文本建议采用外链（class）样式，更方便维护</p>
              <p>你需要在使用的前端项目中引入 src/components/RichText/package.less 样式</p>
            </>
          }
          type='warning'
        />
        <RichText />
      </Card>
    </>
  )
}

export default ComponentRichText
