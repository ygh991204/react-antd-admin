
import { useTranslation } from 'react-i18next'
import { Card, Space } from 'antd'
import ImageUpload from '@/components/ImageUpload'

const ComponentImageCropper = () => {
  const { t } = useTranslation()

  return (
    <Card
      title={
        <Space>
          <span> {t('menus.componentImageUpload')}</span>
        </Space>
      }
      bordered={false}>
      {/*  */}
      <ImageUpload/>
    </Card>
  )
}

export default ComponentImageCropper
