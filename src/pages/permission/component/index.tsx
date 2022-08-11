import { Card, Button, Space } from 'antd'
import Auth from '@/components/Auth'

export default function PermissionComponent() {
  return (
    <Card bordered={false}>
      <Space>
        <Auth render={<Button type='primary'>amin 可见</Button>} permissions={['admin']} />
        <Auth render={<Button type='primary'>amin，user 都可见</Button>} permissions={['admin', 'user']} />
      </Space>
    </Card>
  )
}
