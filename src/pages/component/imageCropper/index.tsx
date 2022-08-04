import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, Space, Button, Typography, Alert, Divider } from 'antd'
import ImageCropper, { ImageCropperRef, ImageCropperDialogRef } from '@/components/ImageCropper'
const { Link } = Typography

import Logo from '/logo.png'

const ComponentImageCropper = () => {
  const { t } = useTranslation()
  const [imgBase, setImgBase] = useState('')
  const [imgBaseDialog, setImgBaseDialog] = useState('')
  const cropper = useRef<ImageCropperRef>(null)
  const cropperDialog = useRef<ImageCropperDialogRef>(null)

  return (
    <>
      <Alert
        message={
          <>
            <p>图片裁剪是后台管理常见的功能，推荐 Cropper.js</p>
            <p>满足基本的图片裁剪需求 ，提供了平铺和弹框裁剪</p>
          </>
        }
        type='info'
      />
      <Card
        style={{ marginTop: '20px' }}
        title={
          <Space>
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
          <div className='fl'>
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
        <Divider>弹框式裁剪</Divider>
        <div style={{ paddingBottom: '20px' }}>
          <Button
            type='primary'
            onClick={() => {
              cropperDialog.current?.open(Logo)
            }}>
            点击裁剪
          </Button>
        </div>
        {imgBaseDialog ? <img style={{ width: '400px', height: 'auto' }} src={imgBaseDialog} /> : null}
        <ImageCropper.Dialog
          ref={cropperDialog}
          onConfim={(_, data) => {
            setImgBaseDialog(data)
          }}
        />
      </Card>
    </>
  )
}

export default ComponentImageCropper
