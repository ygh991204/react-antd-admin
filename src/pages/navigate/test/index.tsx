import { Alert, Card } from 'antd'
import ReactJson from 'react-json-view'
import { useRoute } from '@/router/hook'

export default function RouterTest() {
  const route = useRoute()
  return (
    <>
      <Alert
        message='src/router/useRoute hook提供当前路由解析能力（类似 vue-router 中的 this.$route，基于 react-router-dom 中的 useLocation）'
        type='info'
      />
      <Card style={{ marginTop: '20px' }} bordered={false}>
        <ReactJson src={route} name={false} />
      </Card>
    </>
  )
}
