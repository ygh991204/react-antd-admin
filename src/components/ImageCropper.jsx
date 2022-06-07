import React, { useRef, useEffect, useCallback, useImperativeHandle, useState } from 'react'
import { Button, Space, Spin } from 'antd'
import { UndoOutlined, RedoOutlined } from '@ant-design/icons'
import { v1 as uuidv1 } from 'uuid'
import styled from 'styled-components'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

const CropperWrapper = styled.div`
    padding: 20px;
`

const CropperInner = styled.div`
    width: 600px;
    height: 400px;
`

const dataURLtoFile = (dataurl, name = '') => {
  const fileName = name + '_' + uuidv1() + '.png'
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], fileName, { type: mime })
}

const ImageCropper = React.forwardRef(({ aspectRatio, onReady, url = '' }, ref) => {
  const imageEl = useRef(null)
  const cropper = useRef(null)
  const [loading, setLoading] = useState(false)

  useImperativeHandle(ref, () => ({
    getImageBase64,
    getImageFile,
    initCropper,
    cropperRotateRight,
    cropperRotateLeft
  }))

  const initCropper = useCallback((url) => {
    setLoading(true)
    if (cropper.current) {
      cropper.current.replace(url)
      cropper.current.setAspectRatio(aspectRatio)
    } else {
      cropper.current = createCropper()
    }
  }, [])

  const cropperReady = useCallback(() => {
    setLoading(false)
    onReady && onReady()
  }, [])

  const cropperRotateRight = useCallback(() => {
    cropper.current && cropper.current.rotate(90)
  }, [])

  const cropperRotateLeft = useCallback(() => {
    cropper.current && cropper.current.rotate(-90)
  }, [])

  const getImageBase64 = useCallback(() => {
    return cropper.current ? cropper.current.getCroppedCanvas({
      imageSmoothingQuality: 'high'
    }).toDataURL('image/png') : ''
  }, [])

  const getImageFile = useCallback((name) => {
    const _baseData = getImageBase64()
    return _baseData ? dataURLtoFile(_baseData, name) : null
  }, [])

  const createCropper = useCallback(() => {
    if (imageEl.current) {
      const _cropper = new Cropper(imageEl.current, {
        viewMode: 0,
        dragMode: 'crop',
        aspectRatio: aspectRatio || 'NAN',
        toggleDragModeOnDblclick: false,
        cropBoxMovable: true,
        cropBoxResizable: true,
        checkCrossOrigin: true,
        rotatable: true, // 旋转图像
        scalable: true, // 缩放
        zoomable: true, // 图像放大
        zoomOnWheel: true, // 鼠标滚轮放大
        modal: true, // 黑色遮罩
        guides: true, // 虚线
        ready: cropperReady
      })
      return _cropper
    } else {
      return null
    }
  }, [])

  useEffect(() => {
    if (url) {
      setLoading(true)
      cropper.current = createCropper()
    }
    return () => {
      cropper.current && cropper.current.destroy()
    }
  }, [])

  return (
    <CropperWrapper>
      <Space style={{ paddingBottom: '15px' }}>
        <Button type='primary' onClick={cropperRotateRight} icon={ <RedoOutlined /> }/>
        <Button type='primary' onClick={cropperRotateLeft} icon={ <UndoOutlined /> }/>
      </Space>
      <Spin spinning={loading}>
        <CropperInner>
          <img style={{ height: '100%', width: '100%' }} src={url} ref={imageEl}/>
        </CropperInner>
      </Spin>
    </CropperWrapper>
  )
})

export default ImageCropper
