import { useTranslation } from 'react-i18next'
import { Card, Space, Typography, Input, Button } from 'antd'
import RichText from '@/components/RichText'
import React, { useRef } from 'react'
import { useState } from 'react'

const { Link } = Typography

const ComponentRichText: React.FC = () => {
  const { t } = useTranslation()
  const [val, setVal] = useState('66666')
  return (
    <Card
      title={
        <Space>
          <span> {t('menus.componentRichText')}</span>
          <Link href='https://draftjs.org/' target='_blank'>
            https://draftjs.org/
          </Link>
        </Space>
      }
      bordered={false}>
      <Button onClick={() => {
        setVal('')
      }}>情况</Button>
      <RichText
        value={val}
        onChange={(val) => {
          setVal(val)
          // setVal(val + '_9999')
        }}
      />
    </Card>
  )
}

export default ComponentRichText
