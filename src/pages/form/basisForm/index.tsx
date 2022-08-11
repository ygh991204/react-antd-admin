
import { Card, Form, Select, Input, Button, InputNumber, Space } from 'antd'

import RichText from '@/components/RichText'

import { v1 as uuidv1 } from 'uuid'

const { Option } = Select

const typeOptions: Array<{
  id: string
  name: string
}> = [
  { id: uuidv1(), name: '家电' },
  { id: uuidv1(), name: '数码' }
]

function FormBasis() {
  const [form] = Form.useForm()

  function formFinish(val: any) {
    console.log(val)
  }

  return (
    <Card bordered={false} title='新增商品'>
      <Form
        labelCol={{ span: 4 }}
        style={{ maxWidth: '700px', margin: '10px auto' }}
        requiredMark='optional'
        layout='vertical'
        form={form}
        onFinish={formFinish}>

        <Form.Item label='商品名称' name='name' rules={[{ required: true, message: '请输入名称' }]}>
          <Input allowClear />
        </Form.Item>

        <Form.Item label='价格' name='price' rules={[{ required: true, message: '请输入价格' }]}>
          <InputNumber addonAfter='$' step={10} min={0} precision={2} />
        </Form.Item>

        <Form.Item label='划线价' name='originPrice'>
          <InputNumber addonAfter='$' step={10} min={0} precision={2} />
        </Form.Item>

        <Form.Item label='类别' name='typeId' rules={[{ required: true, message: '请选择类别' }]}>
          <Select allowClear>
            {typeOptions.map((type) => (
              <Option key={type.id} value={type.id}>
                {type.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label='详情' name='detail' rules={[{ required: true, message: '请输入详情' }]}>
          <RichText />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button onClick={() => {
              form.resetFields()
            }}>重置</Button>
            <Button type='primary' htmlType='submit'>
              保存
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default FormBasis
