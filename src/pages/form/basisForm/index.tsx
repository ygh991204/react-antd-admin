import React from 'react'
import { Card, Form, Select, Input, Checkbox, Button } from 'antd'

const FormBasis: React.FC = () => {
  const [form] = Form.useForm()
  return (
    <Card bordered={false}>
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} form={form}>

        <Form.Item
          label='商品名称'
          name='name'
          rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item name='remember' valuePropName='checked' wrapperCol={{ offset: 4, span: 14 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default FormBasis
