import type { UploadChangeParam } from 'antd/lib/upload'
import React, { useRef, useCallback } from 'react'
import { Upload, Button, notification } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { v1 as uuidv1 } from 'uuid'
import { useStateSync } from '@/utils/hooks'
import { FileType, fileFormatValidateImage, fileSizeValidateImage } from '@/utils/file'
import ImageCropper, { ImageCropperDialogRef } from '../ImageCropper'
import { uploadImage, UploadImageReslut } from '@/api/static'
import { UploadFile } from 'antd/lib/upload/interface'

export interface ImageUploadProps {
  type?: 'button' | 'card' | 'avatar'
  multiple?: boolean
  value?: string[]
  showUploadList?: boolean
  maxCount?: number
  cropper?: boolean
  cropperAspectRatio?: number
  onChange?: (urls: string[]) => void
  disabled?: boolean
}

export function createFileItem(url = '', state: 'success' | 'upload' | 'fail' = 'success', uid = uuidv1()) {
  return {
    uid,
    url,
    state
  }
}

export type FileListItem = ReturnType<typeof createFileItem>

const ImageUpload: React.FC<ImageUploadProps> = ({
  type = 'button',
  multiple = false,
  value = [],
  showUploadList = false,
  maxCount,
  cropper = false,
  cropperAspectRatio = NaN,
  onChange,
  disabled = false
}) => {
  const myCropper = useRef<ImageCropperDialogRef>(null)

  const [fileList, setFileList, fileListRef] = useStateSync<FileListItem[]>(() => {
    return value.map((v) => createFileItem(v))
  })

  const fileChange = useCallback(async(info: UploadChangeParam) => {
    if (maxCount && fileListRef.current.length === maxCount && type !== 'button') {
      notification.warning({
        message: '图片数量超出限制',
        description: '最多可上传' + maxCount + '张图片'
      })
      return
    }
    const _fileList = info.fileList
    if (
      _fileList.length &&
      fileFormatValidateImage(_fileList as unknown as File[], true) &&
      fileSizeValidateImage(_fileList as unknown as File[], true)
    ) {
      const uploadFileList = _fileList.map((file) => createFileItem('', 'upload', file.uid))
      setFileList((prev) => {
        return type === 'avatar' ?
          uploadFileList :
          type === 'button' ?
            [...uploadFileList, ...prev] :
            [...prev, ...uploadFileList]
      })
      const response = await Promise.allSettled(_fileList.map((file) => uploadImage(file as unknown as File)))
      const fulfilledResponse = response.filter(
        (item) => item.status === 'fulfilled'
      ) as unknown as PromiseFulfilledResult<UploadImageReslut<UploadFile>>[]
      const reslut = fulfilledResponse.map((v) => v.value)
      setFileList((prev) => {
        if (type === 'avatar') {
          return [
            reslut.length ?
              createFileItem(reslut[0].fileUrl, 'success', prev[0].uid) :
              createFileItem('', 'fail', prev[0].uid)
          ]
        } else {
          return prev.map((item) => {
            if (item.state === 'upload') {
              const _cur = reslut.filter((v) => v.file.uid === item.uid)[0]
              return createFileItem(_cur ? _cur.fileUrl : '', _cur ? 'success' : 'fail', item.uid)
            } else {
              return item
            }
          })
        }
      })
    }
  }, [])

  return (
    <>
      <Upload
        listType={type === 'button' ? 'text' : 'picture-card'}
        showUploadList={false}
        accept={FileType.image}
        action='#'
        disabled={disabled}
        onChange={fileChange}
        customRequest={() => {}}
        multiple={type === 'avatar' ? false : multiple}>
        {type === 'button' ? <Button icon={<UploadOutlined />}>Upload</Button> : type === 'avatar' ? <div /> : <div />}
      </Upload>
      {cropper ? <ImageCropper.Dialog ref={myCropper} aspectRatio={cropperAspectRatio} /> : null}
    </>
  )
}

export default ImageUpload
