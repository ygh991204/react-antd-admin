import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, Space, Button, Typography } from 'antd'
// import { ImageCropper, ImageCropperEvents } from '@/components'
import Logo from '/logo.png'

const { Link } = Typography

const ComponentImageCropper = () => {
  const { t } = useTranslation()
  const [imgBase, setImgBase] = useState('')
  const cropper = useRef()
  return (
    <div>111</div>
    // <Card title={ <Space>
    //   <span> {t('menus.componentImageCropper') }</span>
    //   <Link href='https://fengyuanchen.github.io/cropperjs' target='_blank'>
    //   https://fengyuanchen.github.io/cropperjs/
    //   </Link>
    // </Space>} bordered={false}>
    //   <div className='clearfix'>
    //     <div className='fl' style={{ marginRight: '40px' }}>
    //       <ImageCropper url={Logo} ref={cropper}/>
    //     </div>
    //     <div className='fl' style={{ padding: '20px' }}>
    //       <div style={{ paddingBottom: '20px' }}>
    //         <Button type='primary' onClick={() => {
    //           setImgBase(cropper.current?.getImageBase64())
    //         }}>{ t('componentImageCropper.see') }</Button>
    //       </div>
    //       { imgBase ? <img style={{ width: '400px', height: 'auto' }} src={imgBase} /> : null }
    //     </div>
    //   </div>
    // </Card>
  )
}

export default ComponentImageCropper
