
import { useTranslation } from 'react-i18next'
import { Form, Input, Button, Checkbox, notification } from 'antd'
import { UserOutlined, LockOutlined, GlobalOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import Config from '@/config'

import { login } from '@/store/modules/user'
import { useRouter, useRoute } from '@/router'
import Language from '@/components/Language'
import Logo from '/logo.png'
import { ApiLoginData } from '@/api/user'
import { useAppDispatch } from '@/store'

const LanguageWrapper = styled.div`
  position: fixed;
  top: 30px;
  right: 30px;
  cursor: pointer;
`

const LoginWrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 100px;
  display: flex;
  justify-content: center;
`

const LoginMain = styled.div`
  width: 350px;
`

const LoginHeader = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   padding-bottom: 60px;
`

const LoginLogo = styled.img`
   width: 50px;
   height: 50px;
   margin-right: 16px;
`

const LoginTitle = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: black;
`

const getTimeState = () => {
  // 获取当前时间
  const timeNow = new Date()
  // 获取当前小时
  const hours = timeNow.getHours()
  // 设置默认文字
  let state = ``
  // 判断当前时间段
  if (hours >= 0 && hours <= 10) {
    state = `早上好！`
  } else if (hours > 10 && hours <= 14) {
    state = `中午好！`
  } else if (hours > 14 && hours <= 18) {
    state = `下午好！`
  } else if (hours > 18 && hours <= 24) {
    state = `晚上好！`
  }
  return state
}

const Login = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const route = useRoute()
  const onFinish = (value: ApiLoginData) => {
    dispatch(login(value))
      .unwrap()
      .then(data => {
        notification.success({
          message: getTimeState() + data.nikename,
          description: '欢迎回来'
        })
        router.push(route.query.redirect || '/')
      })
  }
  return (
    <>
      <Language>
        <LanguageWrapper>
          <GlobalOutlined style={{ fontSize: '20px' }} />
        </LanguageWrapper>
      </Language>

      <LoginWrapper>
        <LoginMain>
          <LoginHeader>
            <LoginLogo src={Logo}/>
            <LoginTitle>{Config.title}</LoginTitle>
          </LoginHeader>
          <Form size='large' form={form} name='normal_login' onFinish={onFinish}>
            <Form.Item name='username' rules={[{ required: true, message: t('login.usernameRequiredMsg') }]}>
              <Input prefix={<UserOutlined />} placeholder={t('login.usernamePlaceholder')} />
            </Form.Item>
            <Form.Item name='password' rules={[{ required: true, message: t('login.passwordRequiredMsg') }]}>
              <Input prefix={<LockOutlined />} type='password' placeholder={t('login.passwordPlaceholder')} />
            </Form.Item>
            {/* <Form.Item name='remember' valuePropName='checked'>
              <Checkbox>{t('login.rememberMe')}</Checkbox>
            </Form.Item> */}
            <Form.Item>
              <Button type='primary' block htmlType='submit'>
                {t('login.submitButtonText')}
              </Button>
            </Form.Item>
          </Form>
        </LoginMain>
      </LoginWrapper>
    </>
  )
}

export default Login
