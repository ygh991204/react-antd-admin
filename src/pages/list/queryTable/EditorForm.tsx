import React, { useState, useRef, useImperativeHandle, useCallback } from 'react'
import { edit, add } from '@/api/list'
import { Form, notification, Modal, Input, Switch } from 'antd'
import { merge } from 'lodash-es'

interface EditorFormProps {
  onRefresh?: () => void
}

export interface EditorFormRef {
  open: (data?: Partial<Api.BasisListDb>) => void
}

const EditorForm = React.forwardRef<EditorFormRef, EditorFormProps>(({ onRefresh }, ref) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const formValues = useRef<Partial<Api.BasisListDb>>({})

  useImperativeHandle(ref, () => {
    return {
      open(
        data: Partial<Api.BasisListDb> = {
          status: 1
        }
      ) {
        setTitle(data.id ? '编辑规则' : '新增规则')
        formValues.current = { ...data }
        form.setFieldsValue({ ...data, status: data.status ? data.status === 1 : false as any })
        setVisible(true)
      }
    }
  })

  const submitForm = useCallback(async() => {
    const values = await form.validateFields()
    const formData = merge(formValues.current, {
      ...values,
      status: values.status ? 1 : 2
    })
    if (formData.id) {
      await edit(formData as Api.BasisListDb)
      notification.success({
        message: '编辑成功'
      })
    } else {
      await add(formData)
      notification.success({
        message: '新增成功'
      })
    }
    form.resetFields()
    formValues.current = {}
    setVisible(false)
    onRefresh && onRefresh()
  }, [])

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={submitForm}
      onCancel={() => {
        form.resetFields()
        formValues.current = {}
        setVisible(false)
      }}>
      <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
        <Form.Item label='名称' name='name' rules={[{ required: true, message: '' }]}>
          <Input />
        </Form.Item>

        <Form.Item label='描述' name='description' rules={[{ required: true, message: '请输入描述' }]}>
          <Input />
        </Form.Item>

        <Form.Item label='开关' name='status' valuePropName='checked'>
          <Switch checkedChildren='开启' unCheckedChildren='关闭' />
        </Form.Item>
      </Form>
    </Modal>
  )
})

export default EditorForm
