import React from 'react'
import { Alert, Button, Card, Space } from 'antd'
import { useRouter } from '@/router'

const RouterNavigate: React.FC = () => {
  const router = useRouter()
  return (
    <>
      <Alert
        message='src/router/useRouter hook提供路由跳转能力（类似 vue-router 中的 this.$router，基于 react-router-dom 中的 useNavigate）'
        type='info'
      />
      <Card style={{ marginTop: '20px' }} bordered={false} title='push'>
        <Space direction='vertical'>
          <Button type='link' onClick={() => {
            router.push({
              path: '/'
            })
          }}>
            首页
          </Button>
          <Button type='link' onClick={() => {
            router.push({
              path: '/navigate/test',
              query: {
                id: 'ygh91204'
              }
            })
          }}>
            路由测试页（带 query）
          </Button>
          <Button type='link' onClick={() => {
            router.push({
              path: '/navigate/test',
              params: {
                name: 'antd'
              }
            })
          }}>
            路由测试页（带 params）
          </Button>
        </Space>
      </Card>
      <Card style={{ marginTop: '20px' }} bordered={false} title='replace'>
        <Button type='link' onClick={() => {
          router.replace({
            path: '/detail/basis'
          })
        }}>
            基础详情页
        </Button>
      </Card>
      <Card style={{ marginTop: '20px' }} bordered={false} title='back'>
        <Button type='link' onClick={() => {
          router.back()
        }}>
            返回
        </Button>
      </Card>
    </>
  )
}

export default RouterNavigate
