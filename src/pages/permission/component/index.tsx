import { Card, Button, Space } from 'antd'
import Auth from '@/components/Auth'

export default function PermissionComponent() {
  return (
    <Card bordered={false}>
      <Space>
        <Auth render={<Button type='primary'>编辑（amin，user 都可见）</Button>} permissions={['admin', 'user']} />
        <Auth render={<Button type='primary' danger>删除（amin 可见）</Button>} permissions={['admin']} />
      </Space>
    </Card>
  )
}
