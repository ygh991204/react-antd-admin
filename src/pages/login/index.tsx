import { useTranslation } from 'react-i18next'
import { Form, Input, Button, notification, Space, Checkbox, Card, Alert } from 'antd'
import { GlobalOutlined, GithubOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import CryptoJS from 'crypto-js'
import Cookies from 'js-cookie'
import { EnvConfig } from '@/env'
import { login } from '@/store/modules/userSlice'
import { useRouter } from '@/router/hook'
import Language from '@/components/Language'
import { ApiLoginData } from '@/api/user'
import { useAppDispatch } from '@/store'
import Logo from '/logo.png'
import { useEffect } from 'react'
import { usersDb as USER_LIST } from '../../../mock/_data'
import { ActionsWrapper, LoginHeader, LoginLogo, LoginTitle, LoginWrapper, FooterWrapper } from './style'

function getTimeState() {
  const timeNow = new Date()
  const hours = timeNow.getHours()
  let state = ``
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

export type LoginForm = ApiLoginData & {
  remember: boolean
}

function Login() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [form] = Form.useForm()

  useEffect(() => {
    let password = Cookies.get('password')
    let username = Cookies.get('username')
    if(password && username) {
      const _password = CryptoJS.enc.Base64.parse(password)
      password = _password.toString(CryptoJS.enc.Utf8)
      const _userName = CryptoJS.enc.Base64.parse(username)
      username = _userName.toString(CryptoJS.enc.Utf8)
    }
    form.setFieldsValue({
      username,
      password,
      remember: !!password
    })
  }, [])

  async function handleFish(value: LoginForm) {
    const userInfo = await dispatch(login({
      username: value.username,
      password: value.password
    })).unwrap()
    if(value.remember) {
      const _username = CryptoJS.enc.Utf8.parse(value.username)
      const _password = CryptoJS.enc.Utf8.parse(value.password)
      const username = CryptoJS.enc.Base64.stringify(_username)
      const password = CryptoJS.enc.Base64.stringify(_password)
      Cookies.set('username', username, {
        expires: EnvConfig.APP_PASSWORD_EXPIRES
      })
      Cookies.set('password', password, {
        expires: EnvConfig.APP_PASSWORD_EXPIRES
      })
    } else {
      Cookies.remove('username')
      Cookies.remove('password')
    }
    notification.success({
      message: getTimeState() + userInfo.nikename,
      description: '欢迎回来'
    })
    router.push('/')
  }

  return (
    <>
      <ActionsWrapper>
        <Space size='large'>
          <GithubOutlined style={{ fontSize: '18px' }}/>
          <QuestionCircleOutlined style={{ fontSize: '18px' }}/>
          <Language>
            <GlobalOutlined style={{ fontSize: '18px' }} />
          </Language>
        </Space>
      </ActionsWrapper>

      <LoginWrapper>
        <Card bordered={false}>
          <LoginHeader>
            <LoginLogo src={Logo}/>
            <LoginTitle>{EnvConfig.APP_TITLE}</LoginTitle>
          </LoginHeader>
          <Form size='large' form={form} name='normal_login' onFinish={handleFish}>
            <Form.Item name='username' rules={[{ required: true, message: t('login.usernameRequiredMsg') }]}>
              <Input placeholder={t('login.usernamePlaceholder')} />
            </Form.Item>
            <Form.Item name='password' rules={[{ required: true, message: t('login.passwordRequiredMsg') }]}>
              <Input.Password placeholder={t('login.passwordPlaceholder')} />
            </Form.Item>
            <Form.Item name='remember' valuePropName='checked'>
              <Checkbox>{t('login.rememberMe') }</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type='primary' block htmlType='submit'>
                {t('login.submitButtonText')}
              </Button>
            </Form.Item>
          </Form>
          <Alert
            message={
              <div style={{ lineHeight: 1.5 }}>
                <p style={{ fontWeight: 'bolder' }}>账号和密码</p>
                {
                  USER_LIST.map(user => (
                    <p key={user.password}>{user.nikename}：{user.username}  {user.password}</p>
                  ))
                }
              </div>
            }
            type='info'
          />
        </Card>
      </LoginWrapper>

      <FooterWrapper dangerouslySetInnerHTML={{ __html: EnvConfig.APP_FOOTER }} />
    </>
  )
}

export default Login
