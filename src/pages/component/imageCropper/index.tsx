import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, Space, Button, Typography } from 'antd'
import ImageCropper, { ImageCropperRef } from '@/components/ImageCropper'
const { Link } = Typography

import Logo from '/logo.png'

const ComponentImageCropper = () => {
  const { t } = useTranslation()
  const [imgBase, setImgBase] = useState('')
  const cropper = useRef<ImageCropperRef>(null)

  return (
    <Card
      title={
        <Space>
          <span> {t('menus.componentImageCropper')}</span>
          <Link href='https://fengyuanchen.github.io/cropperjs' target='_blank'>
            https://fengyuanchen.github.io/cropperjs/
          </Link>
        </Space>
      }
      bordered={false}>
      <div className='clearfix'>
        <div className='fl' style={{ marginRight: '40px' }}>
          <ImageCropper ref={cropper} url={Logo} />
        </div>
        <div className='fl' style={{ padding: '20px' }}>
          <div style={{ paddingBottom: '20px' }}>
            <Button
              type='primary'
              onClick={() => {
                setImgBase(cropper.current ? cropper.current.getImageBase64() : '')
              }}>
              {t('componentImageCropper.see')}
            </Button>
          </div>
          {imgBase ? <img style={{ width: '400px', height: 'auto' }} src={imgBase} /> : null}
        </div>
      </div>
    </Card>
  )
}

export default ComponentImageCropper
