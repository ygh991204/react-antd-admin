import { useTranslation } from 'react-i18next'
import { Form, Input, Button, notification, Space } from 'antd'
import { GlobalOutlined, GithubOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { EnvConfig } from '@/env'
import { ActionsWrapper, LoginHeader, LoginLogo, LoginMain, LoginTitle, LoginWrapper } from './style'
import { login } from '@/store/modules/userSlice'
import { useRouter } from '@/router/hook'
import Language from '@/components/Language'
import { ApiLoginData } from '@/api/user'
import { useAppDispatch } from '@/store'
import Logo from '/logo.png'

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

function Login() {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const onFinish = (value: ApiLoginData) => {
    dispatch(login(value))
      .unwrap()
      .then(data => {
        notification.success({
          message: getTimeState() + data.nikename,
          description: '欢迎回来'
        })
        router.push('/')
      })
  }
  return (
    <>
      <ActionsWrapper>
        <Space size='large'>
          <GithubOutlined style={{ fontSize: '20px' }}/>
          <QuestionCircleOutlined style={{ fontSize: '20px' }}/>
          <Language>
            <GlobalOutlined style={{ fontSize: '20px' }} />
          </Language>
        </Space>
      </ActionsWrapper>

      <LoginWrapper>
        <LoginMain>
          <LoginHeader>
            <LoginLogo src={Logo}/>
            <LoginTitle>{EnvConfig.APP_TITLE}</LoginTitle>
          </LoginHeader>
          <Form size='large' form={form} name='normal_login' onFinish={onFinish}>
            <Form.Item name='username' rules={[{ required: true, message: t('login.usernameRequiredMsg') }]}>
              <Input placeholder={t('login.usernamePlaceholder')} />
            </Form.Item>
            <Form.Item name='password' rules={[{ required: true, message: t('login.passwordRequiredMsg') }]}>
              <Input type='password' placeholder={t('login.passwordPlaceholder')} />
            </Form.Item>
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
