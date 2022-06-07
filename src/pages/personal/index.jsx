import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Row, Col, Card, Avatar, Tabs, List, Form, Input, Button, Space } from 'antd'
const { TabPane } = Tabs

const ChangeInfo = () => {
  const user = useSelector(state => state.user.user)
  const [form] = Form.useForm()

  const formFinish = (value) => {
    console.log(value)
  }

  useEffect(() => {
    form.setFieldsValue({
      nikename: user.nikename
    })
  }, [])

  return (
    <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 10 }} onFinish={formFinish}>
      <Form.Item name='nikename' label='昵称' rules={[{ required: true, message: '输入昵称' }]}>
        <Input placeholder='输入昵称' />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
        <Space>
          <Button type='primary' htmlType='submit'>
            提交
          </Button>
          <Button htmlType='button' onClick={() => {
            form.resetFields()
          }}>
            重置
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

const ChangePassWord = () => {
  const [form] = Form.useForm()

  const formFinish = (value) => {
    console.log(value)
  }

  return (
    <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 10 }} onFinish={formFinish}>

      <Form.Item name='oldPassword' label='密码' rules={[{ required: true, message: '输入密码' }]}>
        <Input placeholder='输入密码' />
      </Form.Item>

      <Form.Item name='password' label='新密码' rules={[{ required: true, message: '输入新密码' }]}>
        <Input placeholder='输入新密码' />
      </Form.Item>

      <Form.Item name='confimPassword' label='再次确认' rules={[{ required: true, message: '再次输入新密码' }]}>
        <Input placeholder='再次输入新密码' />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
        <Space>
          <Button type='primary' htmlType='submit'>
              提交
          </Button>
          <Button htmlType='button' onClick={() => {
            form.resetFields()
          }}>
              重置
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

const Personal = () => {
  const user = useSelector(state => state.user.user)
  return (
    <Row gutter={[20, 20]}>
      <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
        <Card bordered={false} title='个人信息'>
          {/* 基本信息 */}
          <div style={{ padding: '26px', textAlign: 'center' }}>
            <Avatar size={88} src={ user.avater }/>
            <div style={{ padding: '20px 0', fontWeight: 'bold', fontSize: '16px' }}>{ user.nikename }</div>
          </div>
          <List.Item extra={ user.username }>
            <List.Item.Meta title ='用户名'/>
          </List.Item>
          <List.Item extra={ user.nikename }>
            <List.Item.Meta title='昵称'/>
          </List.Item>
          <List.Item extra={ user.roleName }>
            <List.Item.Meta title='角色'/>
          </List.Item>
        </Card>
      </Col>
      <Col xxl={16} xl={16} lg={24} md={24} sm={24} xs={24}>
        <Card>
          <Tabs defaultActiveKey='base'>
            <TabPane tab='基本设置' key='base'>
              <ChangeInfo/>
            </TabPane>
            <TabPane tab='密码修改' key='paw'>
              <ChangePassWord/>
            </TabPane>
          </Tabs>
        </Card>
      </Col>
    </Row>
  )
}

export default Personal
