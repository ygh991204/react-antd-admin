import { useEffect } from 'react'
import { Row, Col, Card, Avatar, Tabs, List, Form, Input, Button, Space, Tag, notification } from 'antd'
import { useAppSelector, useAppDispatch } from '@/store'
import { resetPassword, updateUserInfo, ResetPasswordParams, UpdateUserInfoParams } from '@/api/user'
import { getuserInfo } from '@/store/modules/userSlice'
const { TabPane } = Tabs

function ChangeInfo() {
  const user = useAppSelector((state) => state.user.user)
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()

  async function formFinish(value: IAnyObject) {
    const submitData: UpdateUserInfoParams = {
      nikename: value.nikename
    }
    await updateUserInfo(submitData)
    await dispatch(getuserInfo()).unwrap()
    notification.success({
      message: '修改成功'
    })
  }

  useEffect(() => {
    form.setFieldsValue({
      nikename: user.nikename
    })
  }, [])

  return (
    <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 10 }} onFinish={formFinish}>
      <Form.Item name='nikename' label='昵称' rules={[{ required: true, message: '输入昵称', whitespace: true }]}>
        <Input placeholder='输入昵称' />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
        <Space>
          <Button type='primary' htmlType='submit'>
            提交
          </Button>
          <Button
            htmlType='button'
            onClick={() => {
              form.resetFields()
            }}>
            重置
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

function ChangePassWord() {
  const [form] = Form.useForm()

  async function formFinish(value: IAnyObject) {
    const submit: ResetPasswordParams = {
      oldPassword: value.oldPassword,
      newPassword: value.password
    }
    await resetPassword(submit)
    notification.success({
      message: '修改成功',
      description: '您的新密码：' + submit.newPassword
    })
  }

  return (
    <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 10 }} onFinish={formFinish}>
      <Form.Item
        name='oldPassword'
        label='密码'
        getValueFromEvent={(event) => event.target.value.trim()}
        rules={[{ required: true, message: '输入密码', whitespace: true }]}>
        <Input placeholder='输入密码' />
      </Form.Item>

      <Form.Item
        name='password'
        label='新密码'
        getValueFromEvent={(event) => event.target.value.trim()}
        rules={[{ required: true, message: '输入新密码', whitespace: true }]}>
        <Input placeholder='输入新密码' />
      </Form.Item>

      <Form.Item
        name='confimPassword'
        label='再次确认'
        getValueFromEvent={(event) => event.target.value.trim()}
        dependencies={['password']}
        rules={[
          { required: true, message: '请再次输入新密码', whitespace: true },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('两次密码输入不一致'))
            }
          })
        ]}>
        <Input placeholder='再次输入新密码' />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
        <Space>
          <Button type='primary' htmlType='submit'>
            提交
          </Button>
          <Button
            htmlType='button'
            onClick={() => {
              form.resetFields()
            }}>
            重置
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

function Personal() {
  const user = useAppSelector((state) => state.user.user)
  return (
    <Row gutter={[20, 20]}>
      <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
        <Card bordered={false} title='个人信息'>
          <div style={{ padding: '26px', textAlign: 'center' }}>
            <Avatar size={88} src={user.avater} />
            <div style={{ padding: '20px 0', fontWeight: 'bold', fontSize: '16px' }}>{user.nikename}</div>
          </div>
          <List.Item extra={user.username}>
            <List.Item.Meta title='用户名' />
          </List.Item>
          <List.Item extra={user.nikename}>
            <List.Item.Meta title='昵称' />
          </List.Item>
          <List.Item
            extra={user.roles ? user.roles.map((role) => <Tag key={role.roleValue}>{role.roleName}</Tag>) : null}>
            <List.Item.Meta title='角色' />
          </List.Item>
        </Card>
      </Col>
      <Col xxl={16} xl={16} lg={24} md={24} sm={24} xs={24}>
        <Card>
          <Tabs defaultActiveKey='base'>
            <TabPane tab='基本设置' key='base'>
              <ChangeInfo />
            </TabPane>
            <TabPane tab='密码修改' key='paw'>
              <ChangePassWord />
            </TabPane>
          </Tabs>
        </Card>
      </Col>
    </Row>
  )
}

export default Personal
