import type { ForwardRefRenderFunction } from 'react'
import React, { useImperativeHandle, useCallback, useRef, useState } from 'react'
import { Modal } from 'antd'
import ImageCropper, { ImageCropperProps, ImageCropperRef } from './index'
import useNextTick from '@/hooks/useNextTick'

export interface ImageCropperDialogRef {
  open(url: string): void
}

type ImageCropperDialogProps = Omit<ImageCropperProps, 'onReady' | 'url'> & {
  onConfim?: (file: File, base64: string) => void
}

const InternalDialog: ForwardRefRenderFunction<ImageCropperDialogRef, ImageCropperDialogProps> = (
  { aspectRatio = NaN, onConfim },
  ref
) => {
  const [visible, setVisible] = useState(false)
  const cropper = useRef<ImageCropperRef>(null)

  const nextTick = useNextTick()

  useImperativeHandle(ref, () => {
    return {
      open
    }
  })

  const open = useCallback((url: string) => {
    setVisible(true)
    nextTick(() => {
      cropper.current?.resetCropper(url)
    })
  }, [])

  const handlerConfim = useCallback(() => {
    const file = cropper.current?.getImageFile()
    const base64 = cropper.current?.getImageBase64()
    if (file && onConfim && base64) {
      onConfim(file, base64)
    }
    setVisible(false)
  }, [])

  return (
    <>
      <Modal
        title='图片裁剪'
        width='700px'
        visible={visible}
        onCancel={() => {
          setVisible(false)
        }}
        onOk={handlerConfim}>
        <ImageCropper aspectRatio={aspectRatio} ref={cropper} />
      </Modal>
    </>
  )
}

const Dialog = React.forwardRef(InternalDialog)

export default Dialog
