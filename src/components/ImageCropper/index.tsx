import type { ForwardRefRenderFunction, ForwardRefExoticComponent, RefAttributes } from 'react'
import React, { useRef, useEffect, useCallback, useImperativeHandle, useState } from 'react'
import { Button, Space, Spin } from 'antd'
import { UndoOutlined, RedoOutlined } from '@ant-design/icons'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { dataURLtoFile } from '@/utils/file'
import { CropperInner, CropperWrapper } from './style'
import Dialog from './dialog'

export type { ImageCropperDialogRef } from './dialog'

export interface ImageCropperProps {
  url?: string
  onReady?: () => void
  aspectRatio?: number
}

export interface ImageCropperRef {
  getImageBase64: () => string
  getImageFile: (name?: string) => File
  resetCropper: (url: string) => void
  cropperRotateRight: () => void
  cropperRotateLeft: () => void
}

interface ImageCropperTypeProps extends ForwardRefExoticComponent<ImageCropperProps & RefAttributes<ImageCropperRef>> {
  Dialog: typeof Dialog
}

const InternalImageCropper: ForwardRefRenderFunction<ImageCropperRef, ImageCropperProps> = (
  { aspectRatio = NaN, onReady, url = '' },
  ref
) => {
  const imageEl = useRef<HTMLImageElement>(null)
  const cropper = useRef<Cropper>()
  const [loading, setLoading] = useState(false)

  useImperativeHandle(ref, () => ({
    getImageBase64,
    getImageFile,
    resetCropper,
    cropperRotateRight,
    cropperRotateLeft
  }))

  const resetCropper = useCallback((url: string) => {
    setLoading(true)
    if (cropper.current) {
      cropper.current.replace(url)
      cropper.current.setAspectRatio(aspectRatio)
    } else {
      cropper.current = createCropper()
      cropper.current?.replace(url)
      cropper.current?.setAspectRatio(aspectRatio)
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
    return cropper.current ?
      cropper.current
        .getCroppedCanvas({
          imageSmoothingQuality: 'high'
        })
        .toDataURL('image/png') :
      ''
  }, [])

  const getImageFile = useCallback((name = '') => {
    const _baseData = getImageBase64()
    return dataURLtoFile(_baseData, name)
  }, [])

  const createCropper = useCallback(() => {
    if (imageEl.current) {
      return new Cropper(imageEl.current, {
        viewMode: 0,
        dragMode: 'crop',
        aspectRatio: aspectRatio,
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
    }
  }, [])

  useEffect(() => {
    if (url && imageEl.current) {
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
        <Button type='primary' onClick={cropperRotateRight} icon={<RedoOutlined />} />
        <Button type='primary' onClick={cropperRotateLeft} icon={<UndoOutlined />} />
      </Space>
      <Spin spinning={loading}>
        <CropperInner>
          <img style={{ height: '100%', width: '100%' }} src={url} ref={imageEl} />
        </CropperInner>
      </Spin>
    </CropperWrapper>
  )
}

const ImageCropper = React.forwardRef(InternalImageCropper) as ImageCropperTypeProps

ImageCropper.Dialog = Dialog

export default ImageCropper
